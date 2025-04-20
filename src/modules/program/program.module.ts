import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  ProgramEntity,
  ProgramStepActivityEntity,
  ProgramStepEntity,
  ProgramSubscriptionPlanEntity,
  ProgramWorkoutNutrientBurnEntity
} from "./entity";

import {
  ProgramController, 
  ProgramStepActivityController,
  ProgramStepController,
  ProgramSubscriptionPlanController,
  ProgramWorkoutNutrientBurnController
} from "./controller";

import {
  ProgramService,
  ProgramStepActivityService,
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
      ProgramWorkoutNutrientBurnEntity
    ]),
  ],
  controllers: [
    ProgramController,
    ProgramStepActivityController,
    ProgramStepController,
    ProgramSubscriptionPlanController,
    ProgramWorkoutNutrientBurnController
  ],
  providers: [
    ProgramService,
    ProgramStepActivityService,
    ProgramStepService,
    ProgramSubscriptionPlanService,
    ProgramWorkoutNutrientBurnService
  ],
  exports: [
    ProgramService,
    ProgramStepActivityService,
    ProgramStepService,
    ProgramSubscriptionPlanService,
    ProgramWorkoutNutrientBurnService
  ],
})
export class ProgramModule {}
