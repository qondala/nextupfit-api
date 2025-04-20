import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  BaseAppUpdateEntity,
  BaseBodyParamEntity,
  BaseFoodGroupEntity,
  BaseFoodNutrientsEntity,
  BaseFoodEntity,
  BaseMealFoodEntity,
  BaseMealEntity,
  BaseMuscleEntity,
  BaseNutrientEntity,
  BaseUnitEntity,
  BaseWorkoutHowtoPerformStepEntity,
  BaseWorkoutNutrientBurnEntity,
  BaseWorkoutRecommendedRepetitionEntity,
  BaseWorkoutEntity
} from "./entity";


import {
  BaseAppUpdateService,
  BaseBodyParamService,
  BaseFoodGroupService,
  BaseFoodNutrientsService,
  BaseFoodService,
  BaseMealFoodService,
  BaseMealService,
  BaseMuscleService,
  BaseNutrientService,
  BaseUnitService,
  BaseWorkoutHowtoPerformStepService,
  BaseWorkoutNutrientBurnService,
  BaseWorkoutRecommendedRepetitionService,
  BaseWorkoutService
} from "./service";

import {
  BaseAppUpdateController,
  BaseBodyParamController,
  BaseFoodGroupController,
  BaseFoodNutrientsController,
  BaseFoodController,
  BaseMealFoodController,
  BaseMealController,
  BaseMuscleController,
  BaseNutrientController,
  BaseUnitController,
  BaseWorkoutHowtoPerformStepController,
  BaseWorkoutNutrientBurnController,
  BaseWorkoutRecommendedRepetitionController,
  BaseWorkoutController

} from "./controller";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      BaseAppUpdateEntity,
      BaseBodyParamEntity,
      BaseFoodGroupEntity,
      BaseFoodNutrientsEntity,
      BaseFoodEntity,
      BaseMealFoodEntity,
      BaseMealEntity,
      BaseMuscleEntity,
      BaseNutrientEntity,
      BaseUnitEntity,
      BaseWorkoutHowtoPerformStepEntity,
      BaseWorkoutNutrientBurnEntity,
      BaseWorkoutRecommendedRepetitionEntity,
      BaseWorkoutEntity
    ])],
  controllers: [
    BaseAppUpdateController,
    BaseBodyParamController,
    BaseFoodGroupController,
    BaseFoodNutrientsController,
    BaseFoodController,
    BaseMealFoodController,
    BaseMealController,
    BaseMuscleController,
    BaseNutrientController,
    BaseUnitController,
    BaseWorkoutHowtoPerformStepController,
    BaseWorkoutNutrientBurnController,
    BaseWorkoutRecommendedRepetitionController,
    BaseWorkoutController
  ],
  providers: [
    BaseAppUpdateService,
    BaseBodyParamService,
    BaseFoodGroupService,
    BaseFoodNutrientsService,
    BaseFoodService,
    BaseMealFoodService,
    BaseMealService,
    BaseMuscleService,
    BaseNutrientService,
    BaseUnitService,
    BaseWorkoutHowtoPerformStepService,
    BaseWorkoutNutrientBurnService,
    BaseWorkoutRecommendedRepetitionService,
    BaseWorkoutService
  ],
  exports: [
    BaseAppUpdateService,
    BaseBodyParamService,
    BaseFoodGroupService,
    BaseFoodNutrientsService,
    BaseFoodService,
    BaseMealFoodService,
    BaseMealService,
    BaseMuscleService,
    BaseNutrientService,
    BaseUnitService,
    BaseWorkoutHowtoPerformStepService,
    BaseWorkoutNutrientBurnService,
    BaseWorkoutRecommendedRepetitionService,
    BaseWorkoutService
  ],
})
export class BaseModule {}
