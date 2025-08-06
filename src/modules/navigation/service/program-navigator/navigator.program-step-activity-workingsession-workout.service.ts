import { Injectable } from "@nestjs/common";

import { ProgramItemTypeEnum } from "@app/module/program/types";
import { ProgramStepActivityWorkingsessionWorkoutService } from "@app/module/program/service";

import { ProgramNavigationReasonEnum } from "../../types";
import { ProgramNavigationNode } from "../../dto";
import { ActivityAccessRequirementsCheckerService } from "../access-requirements-checker";
import { BrowserPreviousFromStepActivityWorkingsessionWorkoutService } from "../previous-browser";

@Injectable()
export class NavigatorProgramStepActivityWorkingsessionWorkoutService {
  constructor(
    private readonly programStepActivityWorkingsessionWorkoutService: ProgramStepActivityWorkingsessionWorkoutService,
    private readonly activityAccessRequirementsCheckerService: ActivityAccessRequirementsCheckerService,
    private readonly browserPreviousFromStepActivityWorkingsessionWorkoutService: BrowserPreviousFromStepActivityWorkingsessionWorkoutService,
  ) {}

  async next(current: ProgramNavigationNode): Promise<ProgramNavigationNode> {
    const next = {
      programItemType: ProgramItemTypeEnum.activity,
      programItemId: null,
      userId: current.userId,
      title: null,
      description: null,
      icon: null,
      canNavigate: false,
      reasonCannotNavigate: current.reasonCannotNavigate,
    };

    if (!current.canNavigate) {
      return next;
    }

    const programStepActivityWorkingsessionWorkout =
      await this.programStepActivityWorkingsessionWorkoutService.findFirst(
        current.programItemId,
      );
    if (!programStepActivityWorkingsessionWorkout) {
      next.reasonCannotNavigate =
        ProgramNavigationReasonEnum.resourceDoesNotExist;
      return next;
    }

    next.programItemId = programStepActivityWorkingsessionWorkout.id;
    next.title = programStepActivityWorkingsessionWorkout.title;
    next.description = programStepActivityWorkingsessionWorkout.description;
    next.icon = programStepActivityWorkingsessionWorkout.imageUrl;

    const activityAccessRequirementsCheckResult =
      await this.activityAccessRequirementsCheckerService.check(
        programStepActivityWorkingsessionWorkout.programId,
        current.userId,
      );
    if (!activityAccessRequirementsCheckResult.ok) {
      next.reasonCannotNavigate = activityAccessRequirementsCheckResult.reason;
      return next;
    }

    next.canNavigate = true;
    next.reasonCannotNavigate = null;

    return next;
  }

  /**
   * Browse the workout hierarchy backward in order to find the previous smallest node unit (workout ?? workingsession ?? activity ?? step ?? program).
   * In the course of browsing the trail backward, we aim at finding the earliest and smallest node unit that the user has started or completed.
   *
   * @param current The current workout navigation node (ProgramNavigationNode).
   * @returns The previous smallest node unit (ProgramNavigationNode).
   */
  async previous(
    current: ProgramNavigationNode,
  ): Promise<ProgramNavigationNode> {
    return await this.browserPreviousFromStepActivityWorkingsessionWorkoutService.browse(
      current,
    );
  }
}
