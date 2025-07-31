import {
  ProgramNavigationReasonEnum,
  ProgramAccessRequirements,
  ProgramAccessDecision,
} from "../../types";
import {
  ProgramAccessibilityEnum,
  ProgramVisibilityEnum,
} from "@app/module/program/types";

import { UserGymAccessStatus } from "../../dto";


/**
 * Scan program's gym access level requirements (visibility and accessibility)
 * And ensure user satisfies them
 */
export class GymLevelAccessResolver {
  constructor(
    private readonly programAccessRequirements: ProgramAccessRequirements,
    private readonly userGymAccessStatus: UserGymAccessStatus,
  ) {}


  resolve(): ProgramAccessDecision {
    
    const access = {
      ok: true,
      reason: ProgramNavigationReasonEnum.programIsPublic,
    }

    // 1- Check the program visibility (does user has right to view the program)
    const visibility = this.checkProgramVisibility();
    if(!visibility.ok) {
      return visibility;
    }

    // 2- Check the program accessibility (does user has right to attend the program)
    const accessibility = this.checkProgramAccesssibility();
    if(!accessibility.ok) {
      return accessibility;
    }

    return access;
  }



  private checkProgramAccesssibility(): ProgramAccessDecision {

    const access = {
      ok: true,
      reason: ProgramNavigationReasonEnum.programIsPublic,
    }
    
    switch(this.programAccessRequirements.accessibility) {
      case ProgramAccessibilityEnum.gymMembersOnly:
        const gymMembershipStatus = this.checkGymMembershipStatus();
        if(!gymMembershipStatus.ok) {
          return gymMembershipStatus;
        }
        access.reason = gymMembershipStatus.reason;
        break;
      case ProgramAccessibilityEnum.gymMembersAndFollowersOnly:
        const gymMembershipStatus_ = this.checkGymMembershipStatus();
        if(!gymMembershipStatus_.ok) {
          return gymMembershipStatus_;
        }
        access.reason = gymMembershipStatus_.reason;
        break;
      case ProgramAccessibilityEnum.programSubscribersOnly:
        // This has to be checked in the program level access check
        break;
    }

    return access;
  }

  private checkProgramVisibility(): ProgramAccessDecision {

    const access = {
      ok: true,
      reason: ProgramNavigationReasonEnum.programIsPublic,
    }

    switch(this.programAccessRequirements.visibility) {
      case ProgramVisibilityEnum.gymFollowersOnly:
        const follow = this.userGymAccessStatus.followerStatus;
        if(!follow || !follow.accepted || follow.rejected || follow.stopped || follow.blocked) {
          return {
            ok: false,
            reason: ProgramNavigationReasonEnum.isNotFollowingGym,
          }
        }
        access.reason = ProgramNavigationReasonEnum.isFollowingGym;
      case ProgramVisibilityEnum.gymFollowersAndMembersOnly:
        const gymMembershipStatus = this.checkGymMembershipStatus();
        if(!gymMembershipStatus.ok) {
          return gymMembershipStatus;
        }
        access.reason = gymMembershipStatus.reason;
      case ProgramVisibilityEnum.managerFollowersOnly:
        const follower = this.userGymAccessStatus.followerStatus;
        if(!follower || !follower.accepted || follower.rejected || follower.stopped || follower.blocked) {
          return {
            ok: false,
            reason: ProgramNavigationReasonEnum.isNotManagerFollower,
          }
        }
    }

    return access;
  }


  checkGymMembershipStatus(): ProgramAccessDecision {
    
    const access = {
      ok: true,
      reason: ProgramNavigationReasonEnum.hasPaidGymMembershipPlan,
    }


    if(!this.userGymAccessStatus.isMember) { // User has no registered gym membership
      return {
        ok: false,
        reason: ProgramNavigationReasonEnum.isNotGymMember,
      }
    }
    // When the program has no membeship plan restriction
    // it means that all gym members (regardless of their membership plan) can access the program
    // so we just check if user has paid any gym membership plan
    if (!this.programAccessRequirements.authorizedMembershipPlanIds?.length) {
      let hasPaidAnyMembershipPlan = false;
      for (const membershipStatus of this.userGymAccessStatus.membershipStatuses) {
        if(membershipStatus.userPlanExists && membershipStatus.paid) {
          hasPaidAnyMembershipPlan = true;
          break;
        } else if(membershipStatus.userPlanExists && membershipStatus.trialStatus) { // Check trial status
          const trialStatus = membershipStatus.trialStatus;
          if(trialStatus.numberOfDaysLeft > 0 || trialStatus.numberOfActivitiesLeft > 0) {
            hasPaidAnyMembershipPlan = true;
            access.reason = ProgramNavigationReasonEnum.isOnGymMembershipPlanTrial;
            break;
          } else {
            return {
              ok: false,
              reason: ProgramNavigationReasonEnum.gymMembershipPlanTrialEnded,
            }
          }
        }
      }

      if (!hasPaidAnyMembershipPlan) {
        return {
          ok: false,
          reason: ProgramNavigationReasonEnum.hasNotPaidGymMembershipPlan,
        }
      }
    }

    // When the program has membership plan restriction
    // it means that only gym members with a specific membership plan can access the program
    // so we just check if user has paid any of the authorized gym membership plan
    if (this.programAccessRequirements.authorizedMembershipPlanIds?.length) {
      let hasPaidAnyMembershipPlan = false;

      for (const membershipStatus of this.userGymAccessStatus.membershipStatuses) {
        if(
          membershipStatus.userPlanExists && 
          this.programAccessRequirements.authorizedMembershipPlanIds.includes(membershipStatus.gymMembershipPlanId) &&
          membershipStatus.paid
        ) {
          hasPaidAnyMembershipPlan = true;
          break;
        } else if(
          membershipStatus.userPlanExists && 
          this.programAccessRequirements.authorizedMembershipPlanIds.includes(membershipStatus.gymMembershipPlanId) &&
          membershipStatus.trialStatus
        ) {
          const trialStatus = membershipStatus.trialStatus;
          if(trialStatus.numberOfDaysLeft > 0 || trialStatus.numberOfActivitiesLeft > 0) {
            hasPaidAnyMembershipPlan = true;
            access.reason = ProgramNavigationReasonEnum.isOnGymMembershipPlanTrial;
            break;
          } else {
            return {
              ok: false,
              reason: ProgramNavigationReasonEnum.gymMembershipPlanTrialEnded,
            }
          }
        }
      }

      if (!hasPaidAnyMembershipPlan) {
        return {
          ok: false,
          reason: ProgramNavigationReasonEnum.hasNotPaidGymMembershipPlan,
        }
      }
    }

    return access;
  }

}