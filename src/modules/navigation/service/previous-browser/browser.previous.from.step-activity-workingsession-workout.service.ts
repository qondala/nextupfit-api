import {
  Injectable,
} from "@nestjs/common";

import {
  ProgramItemTypeEnum,
} from "@app/module/program/types";
import {
  ProgramStepActivityWorkingsessionWorkoutService,
} from "@app/module/program/service";
import {
  UserProgramEvolutionService,
} from "@app/module/user/service";

import {
  ProgramNavigationNode,
} from "../../dto";
import {
  ProgramNavigationReasonEnum,
} from "../../types";


@Injectable()
export class BrowserPreviousFromStepActivityWorkingsessionWorkoutService {
    constructor(
        private readonly programStepActivityWorkingsessionWorkoutService: ProgramStepActivityWorkingsessionWorkoutService,
        private readonly userProgramEvolutionService: UserProgramEvolutionService,
    ) {}

    async browse(current: ProgramNavigationNode): Promise<ProgramNavigationNode> {

      let previousStepWorkingsessionWorkout = await this.programStepActivityWorkingsessionWorkoutService.findPrevious(current.programItemId);

      while (previousStepWorkingsessionWorkout) {

        let everStartedOrCompletedWorkout = await this.userProgramEvolutionService
          .didUserEverStartedOrCompleted(
            current.userId,
            previousStepWorkingsessionWorkout.id,
            ProgramItemTypeEnum.workout
          );


        if (everStartedOrCompletedWorkout) {
          return {
            programItemType: ProgramItemTypeEnum.workout,
            programItemId: previousStepWorkingsessionWorkout.id,
            userId: current.userId,
            title: previousStepWorkingsessionWorkout.title,
            description: previousStepWorkingsessionWorkout.description,
            icon: previousStepWorkingsessionWorkout.imageUrl,
            canNavigate: true,
            reasonCannotNavigate: null,
          };
        }

        previousStepWorkingsessionWorkout = 
          await this.programStepActivityWorkingsessionWorkoutService
            .findPrevious(previousStepWorkingsessionWorkout.id);
      };

      return {
        programItemType: ProgramItemTypeEnum.workout,
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