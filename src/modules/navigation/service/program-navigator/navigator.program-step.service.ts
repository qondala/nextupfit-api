import { Injectable } from "@nestjs/common";

import { ProgramItemTypeEnum } from "@app/module/program/types";
import {
  ProgramStepService,
  ProgramStepActivityService,
} from "@app/module/program/service";

import { ProgramNavigationReasonEnum } from "../../types";
import { ProgramNavigationNode } from "../../dto";
import { ProgramAccessRequirementsCheckerService } from "../access-requirements-checker";
import { BrowserPreviousFromStepService } from "../previous-browser";

@Injectable()
export class NavigatorProgramStepService {
  constructor(
    private readonly programStepService: ProgramStepService,
    private readonly programStepActivityService: ProgramStepActivityService,
    private readonly browserPreviousFromStepService: BrowserPreviousFromStepService,
    private readonly programAccessRequirementsCheckerService: ProgramAccessRequirementsCheckerService,
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

    const programStepActivity = await this.programStepActivityService.findFirst(
      current.programItemId,
    );

    // If the step has no activity
    // Go to the next step of the program
    if (!programStepActivity) {
      next.reasonCannotNavigate =
        ProgramNavigationReasonEnum.programHasNoStepActivity;

      let nextStep = await this.programStepService.findNext(
        current.programItemId,
      );
      while (nextStep) {
        nextStep = await this.programStepService.findNext(nextStep.id);
      }

      // If there is no next step
      if (!nextStep) {
        next.reasonCannotNavigate = ProgramNavigationReasonEnum.programEnd;
        return next;
      }

      // Next navigation is going to fall on the next step
      next.programItemType = ProgramItemTypeEnum.step;
      next.programItemId = nextStep.id;
      next.title = nextStep.name;
      next.description = nextStep.description;
      next.icon = nextStep.iconUrl;

      return next;
    }

    next.programItemId = programStepActivity.id;
    next.title = programStepActivity.name;
    next.description = programStepActivity.description;
    next.icon = programStepActivity.iconUrl;

    const programAccessRequirementsCheckResult =
      await this.programAccessRequirementsCheckerService.check(
        programStepActivity.programId,
        current.userId,
      );
    if (!programAccessRequirementsCheckResult.ok) {
      next.reasonCannotNavigate = programAccessRequirementsCheckResult.reason;
      return next;
    }

    next.canNavigate = true;
    next.reasonCannotNavigate = null;

    return next;
  }

  /**
   * Browse the step hierarchy backward in order to find the previous smallest node unit (workout ?? workingsession ?? activity ?? step ?? program).
   * In the course of browsing the trail backward, we aim at finding the earliest and smallest node unit that the user has started or completed.
   *
   * @param current The current step navigation node (ProgramNavigationNode).
   * @returns The previous smallest node unit (ProgramNavigationNode).
   */
  async previous(
    current: ProgramNavigationNode,
  ): Promise<ProgramNavigationNode> {
    return await this.browserPreviousFromStepService.browse(current);
  }
}
