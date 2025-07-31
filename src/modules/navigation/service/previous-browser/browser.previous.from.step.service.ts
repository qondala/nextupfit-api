import {
  Injectable,
} from "@nestjs/common";

import {
  ProgramItemTypeEnum,
} from "@app/module/program/types";
import {
  ProgramStepService,
  ProgramStepActivityService,
} from "@app/module/program/service";
import {
  UserProgramEvolutionService,
} from "@app/module/user/service";

import {
  ProgramNavigationReasonEnum,
} from "../../types";
import {
  ProgramNavigationNode,
} from "../../dto";
import {
  BrowserPreviousFromStepActivityService,
} from "./browser.previous.from.step-activity.service";


@Injectable()
export class BrowserPreviousFromStepService {
    constructor(
        private readonly programStepService: ProgramStepService,
        private readonly programStepActivityService: ProgramStepActivityService,
        private readonly userProgramEvolutionService: UserProgramEvolutionService,
        private readonly browserPreviousFromStepActivityService: BrowserPreviousFromStepActivityService,
    ) {}

    /**
     * Browse the step hierarchy to find the previous step or activity or workout or workingsession or workout.
     * We aim at finding the earliest step or activity or workout or workingsession or workout that the user has started or completed.
     * 
     * @param current The current step.
     * @returns The previous step or activity or workout or workingsession or workout.
     */
    async browse(current: ProgramNavigationNode): Promise<ProgramNavigationNode> {

      let previousStep = await this.programStepService.findPrevious(current.programItemId);

      while (previousStep) {

        let lastActivityOfPreviousStep = 
          await this.programStepActivityService
            .findLast(previousStep.id);
        
        let previousNavigationItem = 
          await this.browserPreviousFromStepActivityService
            .browse({
              programItemType: ProgramItemTypeEnum.activity,
              programItemId: lastActivityOfPreviousStep.id,
              userId: current.userId,
              title: null,
              description: null,
              icon: null,
              canNavigate: false,
              reasonCannotNavigate: ProgramNavigationReasonEnum.noPreviousProgramItemStartedOrCompletedFound,
            });

        if (previousNavigationItem.canNavigate) {
          return previousNavigationItem;
        }

        let everStartedOrCompletedStep = 
          await this.userProgramEvolutionService
            .didUserEverStartedOrCompleted(
              current.userId,
              previousStep.id,
              ProgramItemTypeEnum.step
            );

        if (everStartedOrCompletedStep) {
          return {
            programItemType: ProgramItemTypeEnum.step,
            programItemId: previousStep.id,
            userId: current.userId,
            title: previousStep.name,
            description: previousStep.description,
            icon: previousStep.iconUrl,
            canNavigate: true,
            reasonCannotNavigate: null,
          };
        }

        previousStep = 
          await this.programStepService
            .findPrevious(previousStep.id);
      };

      return {
        programItemType: ProgramItemTypeEnum.step,
        programItemId: null,
        userId: current.userId,
        title: null,
        description: null,
        icon: null,
        canNavigate: false,
        reasonCannotNavigate: ProgramNavigationReasonEnum.noPreviousProgramItemStartedOrCompletedFound,
      };
    }
}