import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  BaseNutritionEntity,
  BaseProgramGoalEntity,
  BaseSociologyEntity,
  BaseWorkoutEntity,
} from "@app/module/base/entity";

import {
  UserEntity,
  UserBodyParamEntity,
  UserProgramEvolutionEntity,
  UserRecommendationEntity,
  UserSubscriptionPlanEntity,
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
  UserSubscriptionPlanController,
  UserBookmarkAndFavoriteController,
  UserRecipeController,
  UserCommitmentController,
  UserConsumptionItemController,
  UserConsumptionController,
  UserScheduleController,
  UserCommitmentCompletedItemController
} from "./controller";


import {
  UserService,
  UserBodyParamService,
  UserProgramEvolutionService,
  UserRecommendationService,
  UserSubscriptionPlanService,
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
      UserSubscriptionPlanEntity,
      UserScheduleEntity,
      UserCommitmentCompletedItemEntity,

      // Base entities for user interest
      BaseNutritionEntity,
      BaseProgramGoalEntity,
      BaseSociologyEntity,
      BaseWorkoutEntity,
    ]),
  ],
  controllers: [
    UserController,
    UserBodyParamController,
    UserProgramEvolutionController,
    UserRecommendationController,
    UserSubscriptionPlanController,
    UserBookmarkAndFavoriteController,
    UserRecipeController,
    UserCommitmentController,
    UserConsumptionItemController,
    UserConsumptionController,
    UserScheduleController,
    UserCommitmentCompletedItemController
  ],
  providers: [
    UserService,
    UserBodyParamService,
    UserProgramEvolutionService,
    UserRecommendationService,
    UserSubscriptionPlanService,
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
    UserSubscriptionPlanService,
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
