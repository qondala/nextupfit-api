import {
  Injectable,
} from "@nestjs/common";

import {
  ProgramItemTypeEnum,
} from "@app/module/program/types";
import {
  ProgramStepActivityService,
  ProgramStepActivityWorkingsessionService,
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
  BrowserPreviousFromStepActivityWorkingsessionService,
} from "./browser.previous.from.step-activity-workingsession.service";


@Injectable()
export class BrowserPreviousFromStepActivityService {
    constructor(
        private readonly programStepActivityService: ProgramStepActivityService,
        private readonly userProgramEvolutionService: UserProgramEvolutionService,
        private readonly programStepActivityWorkingsessionService: ProgramStepActivityWorkingsessionService,
        private readonly browserPreviousFromStepActivityWorkingsessionService: BrowserPreviousFromStepActivityWorkingsessionService,
    ) {}

    async browse(current: ProgramNavigationNode): Promise<ProgramNavigationNode> {

      let previousStepActivity = 
        await this.programStepActivityService
          .findPrevious(current.programItemId);

      while (previousStepActivity) {


        let lastWorkingsessionOfPreviousActivity = 
          await this.programStepActivityWorkingsessionService
            .findLast(previousStepActivity.id);
        
        let previousNavigationItem = 
          await this.browserPreviousFromStepActivityWorkingsessionService
            .browse({
              programItemType: ProgramItemTypeEnum.activity,
              programItemId: lastWorkingsessionOfPreviousActivity.id,
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

        let everStartedOrCompletedActivity = 
          await this.userProgramEvolutionService
            .didUserEverStartedOrCompleted(
              current.userId,
              previousStepActivity.id,
              ProgramItemTypeEnum.activity
            );

        if (everStartedOrCompletedActivity) {
          return {
            programItemType: ProgramItemTypeEnum.activity,
            programItemId: previousStepActivity.id,
            userId: current.userId,
            title: previousStepActivity.name,
            description: previousStepActivity.description,
            icon: previousStepActivity.iconUrl,
            canNavigate: true,
            reasonCannotNavigate: null,
          };
        }

        previousStepActivity = 
          await this.programStepActivityService
            .findPrevious(
              previousStepActivity.id
            );
      };

      return {
        programItemType: ProgramItemTypeEnum.activity,
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