import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  BaseNutritionEntity,
  BaseProgramGoalEntity,
  BaseSociologyEntity,
  BaseWorkoutEntity
} from '@app/module/base/entity';

import {
  UserEntity,
  UserInterestEntity
} from "@app/module/user/entity";
import { GymManagerEntity } from "@app/module/gym/entity";

import { UserInterestService } from "@app/module/user/service";



import {
  ProgramEntity,
  ProgramPerSociologyEntity,
  ProgramStepActivityEntity,
  ProgramStepActivityWorkingsessionEntity,
  ProgramStepActivityWorkingsessionWorkoutEntity,
  ProgramStepEntity,
  ProgramSubscriptionPlanEntity,
  ProgramWorkoutNutrientBurnEntity,
  ProgramManagerEntity,
  ProgramFreetoolInterestEntity,
  ProgramFreetoolEntity,
  ProgramInterestEntity
} from "./entity";

import {
  ProgramController, 
  ProgramFreetoolController, 
  ProgramFreetoolInterestController, 
  ProgramInterestController, 
  ProgramManagerController, 
  ProgramPerSociologyController, 
  ProgramStepActivityController,
  ProgramStepActivityWorkingsessionController,
  ProgramStepActivityWorkingsessionWorkoutController,
  ProgramStepController,
  ProgramSubscriptionPlanController,
  ProgramWorkoutNutrientBurnController
} from "./controller";

import {
  ProgramFreetoolInterestService,
  ProgramFreetoolService,
  ProgramInterestService,
  ProgramManagerService,
  ProgramPerSociologyService,
  ProgramService,
  ProgramStepActivityService,
  ProgramStepActivityWorkingsessionService,
  ProgramStepActivityWorkingsessionWorkoutService,
  ProgramStepService,
  ProgramSubscriptionPlanService,
  ProgramWorkoutNutrientBurnService,
} from "./service";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramEntity,
      ProgramStepEntity,
      ProgramStepActivityEntity,
      ProgramSubscriptionPlanEntity,
      ProgramWorkoutNutrientBurnEntity,
      ProgramStepActivityWorkingsessionEntity,
      ProgramStepActivityWorkingsessionWorkoutEntity,
      ProgramPerSociologyEntity,
      ProgramManagerEntity,
      ProgramFreetoolEntity,
      ProgramInterestEntity,
      ProgramFreetoolInterestEntity,

      // External modules
      BaseSociologyEntity,
      GymManagerEntity,
      BaseNutritionEntity,
      BaseProgramGoalEntity,
      BaseSociologyEntity,
      BaseWorkoutEntity,
      UserEntity,
      UserInterestEntity
    ]),
  ],
  controllers: [
    ProgramController,
    ProgramStepController,
    ProgramStepActivityController,
    ProgramSubscriptionPlanController,
    ProgramWorkoutNutrientBurnController,
    ProgramStepActivityWorkingsessionController,
    ProgramStepActivityWorkingsessionWorkoutController,
    ProgramPerSociologyController,
    ProgramManagerController,
    ProgramFreetoolController,
    ProgramInterestController,
    ProgramFreetoolInterestController,
  ],
  providers: [
    ProgramService,
    ProgramStepActivityService,
    ProgramStepService,
    ProgramSubscriptionPlanService,
    ProgramWorkoutNutrientBurnService,
    ProgramStepActivityWorkingsessionService,
    ProgramStepActivityWorkingsessionWorkoutService,
    ProgramPerSociologyService,
    ProgramManagerService,
    ProgramFreetoolService,
    ProgramInterestService,
    ProgramFreetoolInterestService,
    UserInterestService
  ],
  exports: [
    ProgramService,
    ProgramStepActivityService,
    ProgramStepService,
    ProgramSubscriptionPlanService,
    ProgramWorkoutNutrientBurnService,
    ProgramStepActivityWorkingsessionService,
    ProgramStepActivityWorkingsessionWorkoutService,
    ProgramPerSociologyService,
    ProgramManagerService,
    ProgramFreetoolService,
    ProgramInterestService,
    ProgramFreetoolInterestService,
    UserInterestService
  ],
})
export class ProgramModule {}
