import { Injectable } from "@nestjs/common";

import { ProgramStepActivityWorkingsessionService } from "@app/module/program/service";
import { UserProgramEvolutionService } from "@app/module/user/service";
import { ProgramItemTypeEnum } from "@app/module/program/types";

import { ProgramNavigationReasonEnum } from "../../types";
import { ProgramNavigationNode } from "../../dto";
import { BrowserPreviousFromStepActivityWorkingsessionWorkoutService } from "./browser.previous.from.step-activity-workingsession-workout.service";

@Injectable()
export class BrowserPreviousFromStepActivityWorkingsessionService {
  constructor(
    private readonly programStepActivityWorkingsessionService: ProgramStepActivityWorkingsessionService,
    private readonly userProgramEvolutionService: UserProgramEvolutionService,
    private readonly browserPreviousFromStepActivityWorkingsessionWorkoutService: BrowserPreviousFromStepActivityWorkingsessionWorkoutService,
  ) {}

  async browse(current: ProgramNavigationNode): Promise<ProgramNavigationNode> {
    let previousStepActivityWorkingsession =
      await this.programStepActivityWorkingsessionService.findPrevious(
        current.programItemId,
      );

    while (previousStepActivityWorkingsession) {
      const lastWorkingsessionOfPreviousActivity =
        await this.programStepActivityWorkingsessionService.findLast(
          previousStepActivityWorkingsession.id,
        );

      const previousNavigationItem =
        await this.browserPreviousFromStepActivityWorkingsessionWorkoutService.browse(
          {
            programItemType: ProgramItemTypeEnum.workingsession,
            programItemId: lastWorkingsessionOfPreviousActivity.id,
            userId: current.userId,
            title: null,
            description: null,
            icon: null,
            canNavigate: false,
            reasonCannotNavigate:
              ProgramNavigationReasonEnum.noPreviousProgramItemStartedOrCompletedFound,
          },
        );

      if (previousNavigationItem.canNavigate) {
        return previousNavigationItem;
      }

      const everStartedOrCompletedWorkingsession =
        await this.userProgramEvolutionService.didUserEverStartedOrCompleted(
          current.userId,
          previousStepActivityWorkingsession.id,
          ProgramItemTypeEnum.workingsession,
        );

      if (everStartedOrCompletedWorkingsession) {
        return {
          programItemType: ProgramItemTypeEnum.workingsession,
          programItemId: previousStepActivityWorkingsession.id,
          userId: current.userId,
          title: previousStepActivityWorkingsession.name,
          description: previousStepActivityWorkingsession.description,
          icon: previousStepActivityWorkingsession.imageUrl,
          canNavigate: true,
          reasonCannotNavigate: null,
        };
      }

      previousStepActivityWorkingsession =
        await this.programStepActivityWorkingsessionService.findPrevious(
          previousStepActivityWorkingsession.id,
        );
    }

    return {
      programItemType: ProgramItemTypeEnum.workingsession,
      programItemId: null,
      userId: current.userId,
      title: null,
      description: null,
      icon: null,
      canNavigate: false,
      reasonCannotNavigate:
        ProgramNavigationReasonEnum.noPreviousProgramItemStartedOrCompletedFound,
    };
  }
}
