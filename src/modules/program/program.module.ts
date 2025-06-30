import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BaseSociologyEntity } from "@app/module/base/entity";
import { GymManagerEntity } from "@app/module/gym/entity";

import {
  ProgramActivityContentEntity,
  ProgramEntity,
  ProgramPerSociologyEntity,
  ProgramStepActivityEntity,
  ProgramStepActivityWorkingsessionEntity,
  ProgramStepActivityWorkingsessionWorkoutEntity,
  ProgramStepEntity,
  ProgramSubscriptionPlanEntity,
  ProgramWorkoutNutrientBurnEntity,
  ProgramManagerEntity
} from "./entity";

import {
  ProgramActivityContentController,
  ProgramController, 
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
  ProgramActivityContentService,
  ProgramManagerService,
  ProgramPerSociologyService,
  ProgramService,
  ProgramStepActivityService,
  ProgramStepActivityWorkingsessionService,
  ProgramStepActivityWorkingsessionWorkoutService,
  ProgramStepService,
  ProgramSubscriptionPlanService,
  ProgramWorkoutNutrientBurnService
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
      ProgramActivityContentEntity,
      ProgramPerSociologyEntity,
      ProgramManagerEntity,

      BaseSociologyEntity,
      GymManagerEntity,

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
    ProgramActivityContentController,
    ProgramPerSociologyController,
    ProgramManagerController
  ],
  providers: [
    ProgramService,
    ProgramStepActivityService,
    ProgramStepService,
    ProgramSubscriptionPlanService,
    ProgramWorkoutNutrientBurnService,
    ProgramStepActivityWorkingsessionService,
    ProgramStepActivityWorkingsessionWorkoutService,
    ProgramActivityContentService,
    ProgramPerSociologyService,
    ProgramManagerService
  ],
  exports: [
    ProgramService,
    ProgramStepActivityService,
    ProgramStepService,
    ProgramSubscriptionPlanService,
    ProgramWorkoutNutrientBurnService,
    ProgramStepActivityWorkingsessionService,
    ProgramStepActivityWorkingsessionWorkoutService,
    ProgramActivityContentService,
    ProgramPerSociologyService,
    ProgramManagerService
  ],
})
export class ProgramModule {}
