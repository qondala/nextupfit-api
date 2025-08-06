import { Injectable } from "@nestjs/common";

import { ProgramStepActivityEntity } from "@app/module/program/entity";
import { ProgramStepActivityService } from "@app/module/program/service";
import { GymManagerFollowerService } from "@app/module/gym/service";

import {
  ProgramAccessDecision,
  ProgramAccessRequirements,
  ProgramNavigationReasonEnum,
} from "../../types";
import {
  UserGymAccessStatusService,
  UserProgramAccessStatusService,
} from "../user-access-status";
import {
  GymLevelAccessResolver,
  ProgramLevelAccessResolver,
} from "../access-resolver";
import { ProgramAccessRequirementsCheckerService } from ".";

@Injectable()
export class ActivityAccessRequirementsCheckerService {
  constructor(
    private readonly programStepActivityService: ProgramStepActivityService,
    private readonly gymManagerFollowerService: GymManagerFollowerService,
    private readonly userGymAccessStatusService: UserGymAccessStatusService,
    private readonly userProgramAccessStatusService: UserProgramAccessStatusService,
    private readonly programAccessRequirementsCheckerService: ProgramAccessRequirementsCheckerService,
  ) {}

  /**
   * Check if user satisfies the activity access requirements
   *
   * If the activity is owned by a gym
   * Check if user satisfies the activity's gym level access requirements
   *
   * If the activity is owned by a manager
   * Check if user satisfies the activity's program level access requirements
   *
   * @param activityId
   * @param userId
   * @returns
   */
  async check(
    activityId: number,
    userId: number,
  ): Promise<ProgramAccessDecision> {
    // Collecting Access Requirements (AR): fetch the activity
    // AR live in the {visibility} and {accessibility} attributes of the activity
    const activity = await this.programStepActivityService.findOne(activityId);

    if (!activity) {
      return {
        ok: false,
        reason: ProgramNavigationReasonEnum.resourceDoesNotExist,
      };
    }

    // Check if user satisfies the program access requirements
    const programAccessCheckResult =
      await this.programAccessRequirementsCheckerService.check(
        activity.programId,
        userId,
      );

    // If user does not satisfy the program access requirements
    // No need to check the activity access requirements
    if (!programAccessCheckResult.ok) {
      return programAccessCheckResult;
    }

    return this.checkActivityAccessRequirements(activity, userId);
  }

  private async checkActivityAccessRequirements(
    activity: ProgramStepActivityEntity,
    userId: number,
  ): Promise<ProgramAccessDecision> {
    const activityAccessRequirements: ProgramAccessRequirements = {
      ...activity,
    };

    // If the activity is owned by a gym
    // check if user satisfies the activity's gym level access requirements
    if (activity.gymId) {
      // Collect user's access status in the gym
      const userGymAccessStatus =
        await this.userGymAccessStatusService.getUserGymAccessStatus(
          userId,
          activity.gymId,
        );

      // Check if user satisfies the gym access requirements of the activity
      const gymLevelAccessResolver = new GymLevelAccessResolver(
        activityAccessRequirements,
        userGymAccessStatus,
      );
      const gymAccessLevelCheckResult = gymLevelAccessResolver.resolve();

      // If user does not satisfy the gym access requirements of the activity
      // No need to check the program level access requirements
      if (!gymAccessLevelCheckResult.ok) {
        return gymAccessLevelCheckResult;
      }
    }

    // Check if user satisfies program level access requirements
    const userProgramAccessStatus =
      await this.userProgramAccessStatusService.getUserProgramAccessStatus(
        userId,
        activity.programId,
      );
    const isFollowing = await this.gymManagerFollowerService.isFollowing(
      userId,
      activity.ownerManagerId,
    );
    userProgramAccessStatus.managerFollowerStatus = isFollowing
      ? { ...isFollowing }
      : null;

    const programAccessLevelResolver = new ProgramLevelAccessResolver(
      activityAccessRequirements,
      userProgramAccessStatus,
    );
    const programAccessLevelCheckResult = programAccessLevelResolver.resolve();

    return programAccessLevelCheckResult;
  }
}
