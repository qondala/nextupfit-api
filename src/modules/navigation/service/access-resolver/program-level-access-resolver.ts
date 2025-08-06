import {
  ProgramAccessibilityEnum,
  ProgramVisibilityEnum,
} from "@app/module/program/types";

import {
  ProgramNavigationReasonEnum,
  ProgramAccessRequirements,
  ProgramAccessDecision,
} from "../../types";

import { UserProgramAccessStatus } from "../../dto";

/**
 * Scan program access level requirements (visibility and accessibility)
 * And ensure user satisfies them
 */
export class ProgramLevelAccessResolver {
  constructor(
    private readonly programAccessRequirements: ProgramAccessRequirements,
    private readonly userProgramAccessStatus: UserProgramAccessStatus,
  ) {}

  resolve(): ProgramAccessDecision {
    const access = {
      ok: true,
      reason: ProgramNavigationReasonEnum.programIsPublic,
    };

    // 1- Check the program visibility
    const visibility = this.checkProgramVisibility();
    if (!visibility.ok) {
      return visibility;
    }

    // 2- Check the program accessibility
    const accessibility = this.checkProgramAccesssibility();
    if (!accessibility.ok) {
      return accessibility;
    }

    return access;
  }

  private checkProgramAccesssibility(): ProgramAccessDecision {
    const access = {
      ok: true,
      reason: ProgramNavigationReasonEnum.programIsPublic,
    };

    switch (this.programAccessRequirements.accessibility) {
      case ProgramAccessibilityEnum.gymMembersOnly:
        // This accessibility should have already been checked in the gym level access checker
        break;
      case ProgramAccessibilityEnum.gymMembersAndFollowersOnly:
        // This accessibility should have already been checked in the gym level access checker
        break;
      case ProgramAccessibilityEnum.programSubscribersOnly:
        const programSubscriptionStatus = this.checkProgramSubscriptionStatus();
        if (!programSubscriptionStatus.ok) {
          return programSubscriptionStatus;
        }
        access.reason = programSubscriptionStatus.reason;
        break;
    }

    return access;
  }

  private checkProgramVisibility(): ProgramAccessDecision {
    const access = {
      ok: true,
      reason: ProgramNavigationReasonEnum.programIsPublic,
    };

    switch (this.programAccessRequirements.visibility) {
      case ProgramVisibilityEnum.gymFollowersOnly:
        // This visibility should have already been checked in the gym level access checker
        break;
      case ProgramVisibilityEnum.gymFollowersAndMembersOnly:
        // This visibility should have already been checked in the gym level access checker
        break;
      case ProgramVisibilityEnum.managerFollowersOnly:
        const follower = this.userProgramAccessStatus.managerFollowerStatus;
        if (
          !follower ||
          !follower.accepted ||
          follower.rejected ||
          follower.stopped ||
          follower.blocked
        ) {
          return {
            ok: false,
            reason: ProgramNavigationReasonEnum.isNotManagerFollower,
          };
        }
    }

    return access;
  }

  checkProgramSubscriptionStatus(): ProgramAccessDecision {
    const access = {
      ok: true,
      reason: ProgramNavigationReasonEnum.hasPaidProgramSubscriptionPlan,
    };

    if (!this.userProgramAccessStatus.everSubscribedToProgram) {
      // User has no registered gym membership
      return {
        ok: false,
        reason: ProgramNavigationReasonEnum.isNotProgramSubscriber,
      };
    }
    // When the program has no membeship plan restriction
    // it means that all program subscribers (regardless of their membership plan) can access the program
    // so we just check if user has paid any gym membership plan
    if (!this.programAccessRequirements.authorizedMembershipPlanIds?.length) {
      let hasPaidAnyProgramSubscriptionPlan = false;
      for (const programSubscriptionStatus of this.userProgramAccessStatus
        .programSubscriptionStatuses) {
        if (
          programSubscriptionStatus.userPlanExists &&
          programSubscriptionStatus.paid
        ) {
          hasPaidAnyProgramSubscriptionPlan = true;
          break;
        } else if (
          programSubscriptionStatus.userPlanExists &&
          programSubscriptionStatus.trialStatus
        ) {
          // Check trial status
          const trialStatus = programSubscriptionStatus.trialStatus;
          if (
            trialStatus.numberOfDaysLeft > 0 ||
            trialStatus.numberOfActivitiesLeft > 0
          ) {
            hasPaidAnyProgramSubscriptionPlan = true;
            access.reason =
              ProgramNavigationReasonEnum.isOnProgramSubscriptionPlanTrial;
            break;
          } else {
            return {
              ok: false,
              reason:
                ProgramNavigationReasonEnum.programSubscriptionPlanTrialEnded,
            };
          }
        }
      }

      if (!hasPaidAnyProgramSubscriptionPlan) {
        return {
          ok: false,
          reason: ProgramNavigationReasonEnum.hasNotPaidProgramSubscriptionPlan,
        };
      }
    }

    // When the program has membership plan restriction
    // it means that only gym members with a specific membership plan can access the program
    // so we just check if user has paid any of the authorized gym membership plan
    if (this.programAccessRequirements.authorizedMembershipPlanIds?.length) {
      let hasPaidAnyProgramSubscriptionPlan = false;

      for (const programSubscriptionStatus of this.userProgramAccessStatus
        .programSubscriptionStatuses) {
        if (
          programSubscriptionStatus.userPlanExists &&
          this.programAccessRequirements.authorizedMembershipPlanIds.includes(
            programSubscriptionStatus.programSubscriptionPlanId,
          ) &&
          programSubscriptionStatus.paid
        ) {
          hasPaidAnyProgramSubscriptionPlan = true;
          break;
        } else if (
          programSubscriptionStatus.userPlanExists &&
          this.programAccessRequirements.authorizedMembershipPlanIds.includes(
            programSubscriptionStatus.programSubscriptionPlanId,
          ) &&
          programSubscriptionStatus.trialStatus
        ) {
          const trialStatus = programSubscriptionStatus.trialStatus;
          if (
            trialStatus.numberOfDaysLeft > 0 ||
            trialStatus.numberOfActivitiesLeft > 0
          ) {
            hasPaidAnyProgramSubscriptionPlan = true;
            access.reason =
              ProgramNavigationReasonEnum.isOnProgramSubscriptionPlanTrial;
            break;
          } else {
            return {
              ok: false,
              reason:
                ProgramNavigationReasonEnum.programSubscriptionPlanTrialEnded,
            };
          }
        }
      }

      if (!hasPaidAnyProgramSubscriptionPlan) {
        return {
          ok: false,
          reason: ProgramNavigationReasonEnum.hasNotPaidProgramSubscriptionPlan,
        };
      }
    }

    return access;
  }
}
