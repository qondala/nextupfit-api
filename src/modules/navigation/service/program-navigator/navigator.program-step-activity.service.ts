import { Injectable } from "@nestjs/common";

import { ProgramItemTypeEnum } from "@app/module/program/types";
import { ProgramStepActivityWorkingsessionService } from "@app/module/program/service";

import { ProgramNavigationReasonEnum } from "../../types";
import { ProgramNavigationNode } from "../../dto";
import { BrowserPreviousFromStepActivityService } from "../previous-browser";
import { ProgramAccessRequirementsCheckerService } from "../access-requirements-checker";

@Injectable()
export class NavigatorProgramStepActivityService {
  constructor(
    private readonly programStepActivityWorkingsessionService: ProgramStepActivityWorkingsessionService,
    private readonly programAccessRequirementsCheckerService: ProgramAccessRequirementsCheckerService,
    private readonly browserPreviousFromStepActivityService: BrowserPreviousFromStepActivityService,
  ) {}

  async next(current: ProgramNavigationNode): Promise<ProgramNavigationNode> {
    const next = {
      programItemType: ProgramItemTypeEnum.workingsession,
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

    const programStepActivityWorkingsession =
      await this.programStepActivityWorkingsessionService.findFirst(
        current.programItemId,
      );
    if (!programStepActivityWorkingsession) {
      next.reasonCannotNavigate =
        ProgramNavigationReasonEnum.resourceDoesNotExist;
      return next;
    }

    next.programItemId = programStepActivityWorkingsession.id;
    next.title = programStepActivityWorkingsession.name;
    next.description = programStepActivityWorkingsession.description;
    next.icon = programStepActivityWorkingsession.imageUrl;

    const programAccessRequirementsCheckResult =
      await this.programAccessRequirementsCheckerService.check(
        programStepActivityWorkingsession.programId,
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
   * Browse the activity hierarchy backward in order to find the previous smallest node unit (workout ?? workingsession ?? activity ?? step ?? program).
   * In the course of browsing the trail backward, we aim at finding the earliest and smallest node unit that the user has started or completed.
   *
   * @param current The current activity navigation node (ProgramNavigationNode).
   * @returns The previous smallest node unit (ProgramNavigationNode).
   */
  async previous(
    current: ProgramNavigationNode,
  ): Promise<ProgramNavigationNode> {
    return await this.browserPreviousFromStepActivityService.browse(current);
  }
}
