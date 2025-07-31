import { Injectable } from "@nestjs/common";


import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";
import {
  ProgramAccessibilityEnum,
  ProgramVisibilityEnum
} from "@app/module/program/types";
import {
  ProgramSubscriptionEntity,
  ProgramSubscriptionPlanEntity
} from "@app/module/program/entity";


import { UserProgramEvolutionService } from "@app/module/user/service";
import {
  ProgramSubscriptionPlanService,
  ProgramSubscriptionService
} from "@app/module/program/service";
import { PaymentService } from "@app/module/payment/service";


import { UserProgramAccessStatus } from "../../dto";
import { TrialPlanItemType } from "../../types";



@Injectable()
export class UserProgramAccessStatusService {
  constructor(
    private readonly programSubscriptionPlanService: ProgramSubscriptionPlanService,
    private readonly userProgramEvolutionService: UserProgramEvolutionService,
    private readonly programSubscriptionService: ProgramSubscriptionService,
    private readonly paymentService: PaymentService,
  ) {}

  async getUserProgramAccessStatus(userId: number, programId: number): Promise<UserProgramAccessStatus> {
    

    const userProgramAccessStatus: UserProgramAccessStatus = {
      everSubscribedToProgram: false,
      programSubscriptionStatuses: [],
      accessibility: ProgramAccessibilityEnum.public,
      visibility: ProgramVisibilityEnum.public,
      authorizedMembershipPlanIds: [],
      authorizedProgramSubscriptionPlanIds: [],
      managerFollowerStatus: null,
    };


    // Get subscription plans of the program
    const programSubscriptionPlans = await this.programSubscriptionPlanService.getAllSubscriptionPlansOfProgram(programId);


    // Get user's subscriptions in the program
    const userProgramSubscriptions = await this.programSubscriptionService.findByUserIdAndProgramId(userId, programId);
    userProgramAccessStatus.everSubscribedToProgram = !!userProgramSubscriptions;


    // For each subscription plan, check if the user has paid it within the due date
    for (const programSubscriptionPlan of programSubscriptionPlans) {

      const userProgramSubscription = userProgramSubscriptions.find(
        (subscription) => subscription.programSubscriptionPlanId === programSubscriptionPlan.id);

      const hasPaidSusbscription = await this.hasUserPaidSubscriptionWithinDueDate(userProgramSubscription, programSubscriptionPlan);
     
      userProgramAccessStatus.programSubscriptionStatuses.push({
        id: programSubscriptionPlan.id,
        programId: programId,
        subscriberUserId: userId,
        programSubscriptionPlanId: programSubscriptionPlan.id,
        startedDate: userProgramSubscription?.startedDate,
        paid: hasPaidSusbscription,
        trialStatus: {
          trialType: TrialPlanItemType.program,
          planId: programSubscriptionPlan.id,
          numberTrialDaysOfPlan: programSubscriptionPlan.trialNumberDays || 0,
          numberOfDaysLeft: this.numberOfDaysLeft(userProgramSubscription, programSubscriptionPlan),
          numberTrialActivitiesOfPlan: programSubscriptionPlan.trialNumberProgramActivities || 0,
          numberOfActivitiesLeft: await this.numberOfActivitiesLeft(userProgramSubscription, programSubscriptionPlan),
        },
        userPlanExists: !!userProgramSubscription,
        createdAt: userProgramSubscription?.createdAt,
      });
    }

    return userProgramAccessStatus;    
  }


  private numberOfDaysLeft(
    userProgramSubscription: ProgramSubscriptionEntity | null,
    programSubscriptionPlan: ProgramSubscriptionPlanEntity,
  ): number {
    if (!userProgramSubscription) {
      return 0;
    }
    const date = userProgramSubscription.startedDate;
    const today = new Date();
    return programSubscriptionPlan.trialNumberDays - (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  };

  private async numberOfActivitiesLeft(
    userProgramSubscription: ProgramSubscriptionEntity | null,
    programSubscriptionPlan: ProgramSubscriptionPlanEntity,
  ): Promise<number> {
    if (
      !userProgramSubscription || 
      !programSubscriptionPlan || 
      !programSubscriptionPlan.trialNumberProgramActivities
    ) {
      return 0;
    }
    const doneActivitiesSinceUserSubscriptionStarted = 
      await this.userProgramEvolutionService.getNumberOfUserActivityEventsDoneSince(
        userProgramSubscription.subscriberUserId,
        userProgramSubscription.programId,
        programSubscriptionPlan.id,
        userProgramSubscription.startedDate);
    return programSubscriptionPlan.trialNumberProgramActivities - doneActivitiesSinceUserSubscriptionStarted;
  };



  /**
   * Check if user has paid subscription within due date
   * We basically look into the payments table and check if the user made a payment
   * accounting for the subscription plan withing the subscription plan periodicity
   * @param userProgramSubscription
   * @param programSubscriptionPlan
   * @returns
   */
  private async hasUserPaidSubscriptionWithinDueDate(
    userProgramSubscription: ProgramSubscriptionEntity,
    programSubscriptionPlan: ProgramSubscriptionPlanEntity,
  ): Promise<boolean> {
    
    const periodicity = programSubscriptionPlan.periodicity;

    // Looking for the last payment date
    const lastPayment = await this.paymentService.getUserLastPaymentForProgramSubscriptionPlan(
      userProgramSubscription.subscriberUserId,
      programSubscriptionPlan.id,
    );

    
    // In case the subscription plan is lifetime, we just check if the user has made any payment
    // accounting for the subscription plan
    if (lastPayment && periodicity == BaseSubscriptionPlanPeriodicityEnum.lifetime) {
      return true;
    }

    const date = (!lastPayment) ? userProgramSubscription.startedDate : lastPayment.createdAt;

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

    return await this.paymentService.countUserProgramSubscriptionPlanPaymentsWithinPeriod(
      userProgramSubscription.subscriberUserId,
      programSubscriptionPlan.id,
      date,
      dueDate,
    ) > 0;
  }

}
