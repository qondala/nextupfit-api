import { Injectable } from "@nestjs/common";

import {
  GymEntity,
  GymMembershipEntity,
  GymMembershipPlanEntity,
} from "@app/module/gym/entity";
import {
  GymMembershipPlanService,
  GymMembershipService,
  GymManagerFollowerService,
} from "@app/module/gym/service";

import { UserProgramEvolutionService } from "@app/module/user/service";
import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";
import { PaymentService } from "@app/module/payment/service";

import { TrialPlanItemType } from "../../types";
import { UserGymAccessStatus } from "../../dto";


@Injectable()
export class UserGymAccessStatusService {
  constructor(
    private readonly gymMembershipPlanService: GymMembershipPlanService,
    private readonly gymMembershipService: GymMembershipService,
    private readonly gymManagerFollowerService: GymManagerFollowerService,
    private readonly userProgramEvolutionService: UserProgramEvolutionService,
    private readonly paymentService: PaymentService,
  ) {}

  async getUserGymAccessStatus(userId: number, gymId: number): Promise<UserGymAccessStatus> {
    
    const userGymAccessStatus: UserGymAccessStatus = {
      followerStatus: null,
      membershipStatuses: [],
      isMember: false,
    };

    // 1- FOLLOWER STATUS
    // User gym following status
    const followerStatus = await this.gymManagerFollowerService.isFollowing(userId, gymId);
    if (followerStatus) {
      userGymAccessStatus.followerStatus = { ...followerStatus, gymId: gymId };
    }

    // 2- MEMBERSHIP STATUS
    // Get user's memberships in the gym
    const userGymMemberships = await this.gymMembershipService.getUserGymMemberships(userId, gymId);
    userGymAccessStatus.isMember = userGymMemberships.length > 0;

    // Get membership plans of the gym
    const gymMembershipPlans = await this.gymMembershipPlanService.getAllMembershipPlansOfGym(gymId);

    // For each membership plan, check if the user has paid it within the due date
    for (const gymMembershipPlan of gymMembershipPlans) {

      const userGymMembership = userGymMemberships.find(
        (membership) => membership.gymMembershipPlanId === gymMembershipPlan.id);

      const hasUserPaidMembershipWithinDueDate = await this.hasUserPaidMembershipWithinDueDate(userGymMembership, gymMembershipPlan);
     
      userGymAccessStatus.membershipStatuses.push({
        id: gymMembershipPlan.id,
        gymId: gymId,
        memberUserId: userId,
        startedDate: userGymMembership?.startedDate,
        membershipStatus: userGymMembership?.membershipStatus,
        createdAt: userGymMembership?.createdAt,
        paid: hasUserPaidMembershipWithinDueDate,
        trialStatus: {
          trialType: TrialPlanItemType.gym,
          planId: gymMembershipPlan.id,
          numberTrialDaysOfPlan: gymMembershipPlan.trialNumberDays || 0,
          numberOfDaysLeft: this.numberOfDaysLeft(userGymMembership, gymMembershipPlan),
          numberTrialActivitiesOfPlan: gymMembershipPlan.trialNumberProgramActivities || 0,
          numberOfActivitiesLeft: await this.numberOfActivitiesLeft(userGymMembership, gymMembershipPlan),
        },
        userPlanExists: !!userGymMembership,
        gymMembershipPlanId: gymMembershipPlan.id,
      });
    }

    return userGymAccessStatus;    
  }


  private numberOfDaysLeft(
    userGymMembership: GymMembershipEntity | null,
    gymMembershipPlan: GymMembershipPlanEntity,
  ): number {
    if (!userGymMembership) {
      return 0;
    }
    const date = userGymMembership.startedDate;
    const today = new Date();
    return gymMembershipPlan.trialNumberDays - (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  };

  private async numberOfActivitiesLeft(
    userGymMembership: GymMembershipEntity | null,
    gymMembershipPlan: GymMembershipPlanEntity,
  ): Promise<number> {
    if (
      !userGymMembership || 
      !gymMembershipPlan || 
      !gymMembershipPlan.trialNumberProgramActivities
    ) {
      return 0;
    }
    const doneActivitiesSinceUserMembershipStarted = 
      await this.userProgramEvolutionService.getNumberOfUserActivityEventsDoneSince(
        userGymMembership.memberUserId,
        userGymMembership.gymId,
        gymMembershipPlan.id,
        userGymMembership.startedDate);
    return gymMembershipPlan.trialNumberProgramActivities - doneActivitiesSinceUserMembershipStarted;
  };



  /**
   * Check if user has paid membership within due date
   * We basically look into the payments table and check if the user made a payment
   * accounting for the memebership plan withing the membership plan periodicity
   * @param userGymMembership
   * @param gymMembershipPlan
   * @returns
   */
  private async hasUserPaidMembershipWithinDueDate(userGymMembership: GymMembershipEntity, gymMembershipPlan: GymMembershipPlanEntity): Promise<boolean> {
    
    const periodicity = gymMembershipPlan.periodicity;

    // Looking for the last payment date
    const lastPayment = await this.paymentService.getUserLastPaymentForGymMembershipPlan(
      userGymMembership.memberUserId,
      gymMembershipPlan.id,
      userGymMembership.gymId,
    );

    // In case the membership plan is lifetime, we just check if the user has made any payment
    // accounting for the gym membership plan
    if (lastPayment && periodicity == BaseSubscriptionPlanPeriodicityEnum.lifetime) {
      return true;
    }

    const date = (!lastPayment) ? userGymMembership.startedDate : lastPayment.createdAt;

    // Calculate the due date
    let dueDate: Date;
    switch(periodicity) {
      case BaseSubscriptionPlanPeriodicityEnum.weekly:
        dueDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case BaseSubscriptionPlanPeriodicityEnum.monthly:
        dueDate = new Date(date.getTime() + 30 * 24 * 60 * 60 * 1000);
        break;
      case BaseSubscriptionPlanPeriodicityEnum.yearly:
        dueDate = new Date(date.getTime() + 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        break;
    }

    return await this.paymentService.countUserGymMembershipPlanPaymentsWithinPeriod(
      userGymMembership.memberUserId,
      gymMembershipPlan.id,
      userGymMembership.gymId,
      date,
      dueDate,
    ) > 0;
  }

}
