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
  ],
})
export class UserModule {}
