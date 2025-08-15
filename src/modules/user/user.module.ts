import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  BaseNutritionEntity,
  BaseProgramGoalEntity,
  BaseSociologyEntity,
  BaseWorkoutEntity,
} from "@app/module/base/entity";

import {
  ProgramEntity,
  ProgramStepEntity,
  ProgramStepActivityEntity,
  ProgramStepActivityWorkingsessionEntity,
  ProgramStepActivityWorkingsessionPracticeEntity,
} from "@app/module/program/entity";

import {
  UserEntity,
  UserBodyParamEntity,
  UserProgramEvolutionEntity,
  UserRecommendationEntity,
  UserCommitmentEntity,
  UserConsumptionItemEntity,
  UserBookmarkAndFavoriteEntity,
  UserRecipeEntity,
  UserConsumptionEntity,
  UserScheduleEntity,
  UserCommitmentCompletedItemEntity,
  UserInterestEntity,
} from "./entity";

import {
  UserController,
  UserBodyParamController,
  UserProgramEvolutionController,
  UserRecommendationController,
  UserBookmarkAndFavoriteController,
  UserRecipeController,
  UserCommitmentController,
  UserConsumptionItemController,
  UserConsumptionController,
  UserScheduleController,
  UserCommitmentCompletedItemController,
  UserInterestController,
} from "./controller";

import {
  UserService,
  UserBodyParamService,
  UserProgramEvolutionService,
  UserRecommendationService,
  UserBookmarkAndFavoriteService,
  UserRecipeService,
  UserCommitmentService,
  UserConsumptionItemService,
  UserConsumptionService,
  UserScheduleService,
  UserCommitmentCompletedItemService,
  UserInterestService,
} from "./service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserBodyParamEntity,
      UserProgramEvolutionEntity,
      UserRecommendationEntity,
      UserCommitmentEntity,
      UserConsumptionEntity,
      UserConsumptionItemEntity,
      UserBookmarkAndFavoriteEntity,
      UserRecipeEntity,
      UserScheduleEntity,
      UserCommitmentCompletedItemEntity,
      UserInterestEntity,

      // Base entities for user interest
      BaseNutritionEntity,
      BaseProgramGoalEntity,
      BaseSociologyEntity,
      BaseWorkoutEntity,

      // Program entities for user program evolution events
      ProgramEntity,
      ProgramStepEntity,
      ProgramStepActivityEntity,
      ProgramStepActivityWorkingsessionEntity,
      ProgramStepActivityWorkingsessionPracticeEntity,
    ]),
  ],
  controllers: [
    UserController,
    UserBodyParamController,
    UserProgramEvolutionController,
    UserRecommendationController,
    UserBookmarkAndFavoriteController,
    UserRecipeController,
    UserCommitmentController,
    UserConsumptionItemController,
    UserConsumptionController,
    UserScheduleController,
    UserCommitmentCompletedItemController,
    UserInterestController,
  ],
  providers: [
    UserService,
    UserBodyParamService,
    UserProgramEvolutionService,
    UserRecommendationService,
    UserBookmarkAndFavoriteService,
    UserRecipeService,
    UserCommitmentService,
    UserConsumptionItemService,
    UserConsumptionService,
    UserScheduleService,
    UserCommitmentCompletedItemService,
    UserInterestService,
  ],
  exports: [
    UserService,
    UserBodyParamService,
    UserProgramEvolutionService,
    UserRecommendationService,
    UserBookmarkAndFavoriteService,
    UserRecipeService,
    UserCommitmentService,
    UserConsumptionItemService,
    UserConsumptionService,
    UserScheduleService,
    UserCommitmentCompletedItemService,
    UserInterestService,
  ],
})
export class UserModule {}
