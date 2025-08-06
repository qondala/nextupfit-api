import { Injectable } from "@nestjs/common";

import { ProgramService } from "@app/module/program/service";
import { GymManagerFollowerService } from "@app/module/gym/service";

import {
  ProgramAccessDecision,
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

@Injectable()
export class ProgramAccessRequirementsCheckerService {
  constructor(
    private readonly programService: ProgramService,
    private readonly gymManagerFollowerService: GymManagerFollowerService,
    private readonly userGymAccessStatusService: UserGymAccessStatusService,
    private readonly userProgramAccessStatusService: UserProgramAccessStatusService,
  ) {}

  /**
   * Check if user satisfies the program access requirements
   *
   * If the program is owned by a gym
   * Check if user satisfies the program's gym level access requirements
   *
   * If the program is owned by a manager
   * Check if user satisfies the program's program level access requirements
   *
   * @param programId
   * @param userId
   * @returns
   */
  async check(
    programId: number,
    userId: number,
  ): Promise<ProgramAccessDecision> {
    const program = await this.programService.findOne(programId);

    if (!program) {
      return {
        ok: false,
        reason: ProgramNavigationReasonEnum.resourceDoesNotExist,
      };
    }

    const programAccessRequirements = { ...program };

    // If the program is owned by a gym
    // check if user satisfies the program's gym level access requirements
    if (program.gymId) {
      const userGymAccessStatus =
        await this.userGymAccessStatusService.getUserGymAccessStatus(
          userId,
          program.gymId,
        );
      const gymLevelAccessResolver = new GymLevelAccessResolver(
        programAccessRequirements,
        userGymAccessStatus,
      );
      const gymAccessLevelCheckResult = gymLevelAccessResolver.resolve();

      // If user does not satisfy the gym access requirements
      // No need to check the program access requirements
      if (!gymAccessLevelCheckResult.ok) {
        return gymAccessLevelCheckResult;
      }
    }

    // Check if user satisfies the program access requirements set by the gym
    const userProgramAccessStatus =
      await this.userProgramAccessStatusService.getUserProgramAccessStatus(
        userId,
        program.id,
      );
    const isFollowing = await this.gymManagerFollowerService.isFollowing(
      userId,
      program.ownerManagerId,
    );
    userProgramAccessStatus.managerFollowerStatus = isFollowing
      ? { ...isFollowing }
      : null;

    const programAccessLevelResolver = new ProgramLevelAccessResolver(
      programAccessRequirements,
      userProgramAccessStatus,
    );
    const programAccessLevelCheckResult = programAccessLevelResolver.resolve();

    return programAccessLevelCheckResult;
  }
}
