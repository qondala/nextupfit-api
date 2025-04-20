import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  UserEntity,
  UserBodyParamEntity,
  UserProgramEvolutionEntity,
  UserRecommendationEntity,
  UserSubscriptionPlanEntity,
  UserBookmarkAndFavoriteEntity
} from "./entity";

import {
  UserController,
  UserBodyParamController,
  UserProgramEvolutionController,
  UserRecommendationController,
  UserSubscriptionPlanController,
  UserBookmarkAndFavoriteController
} from "./controller";

import {
  UserService,
  UserBodyParamService,
  UserProgramEvolutionService,
  UserRecommendationService,
  UserSubscriptionPlanService,
  UserBookmarkAndFavoriteService
} from "./service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      UserBodyParamEntity,
      UserProgramEvolutionEntity,
      UserRecommendationEntity,
      UserSubscriptionPlanEntity,
      UserBookmarkAndFavoriteEntity
    ]),
  ],
  controllers: [
    UserController,
    UserBodyParamController,
    UserProgramEvolutionController,
    UserRecommendationController,
    UserSubscriptionPlanController,
    UserBookmarkAndFavoriteController
  ],
  providers: [
    UserService,
    UserBodyParamService,
    UserProgramEvolutionService,
    UserRecommendationService,
    UserSubscriptionPlanService,
    UserBookmarkAndFavoriteService
  ],
  exports: [
    UserService,
    UserBodyParamService,
    UserProgramEvolutionService,
    UserRecommendationService,
    UserSubscriptionPlanService,
    UserBookmarkAndFavoriteService
  ],
})
export class UserModule {}
