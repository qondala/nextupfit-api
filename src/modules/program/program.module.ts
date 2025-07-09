import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BaseSociologyEntity } from "@app/module/base/entity";
import { GymManagerEntity } from "@app/module/gym/entity";

import {
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
    ProgramPerSociologyService,
    ProgramManagerService
  ],
})
export class ProgramModule {}
