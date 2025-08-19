import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  BaseNutritionEntity,
  BaseProgramGoalEntity,
  BaseSociologyEntity,
  BaseWorkoutEntity,
} from "@app/module/base/entity";

import { UserEntity, UserInterestEntity } from "@app/module/user/entity";
import {
  GymEntity,
  GymManagerEntity,
  GymFollowerEntity,
  GymManagerFollowerEntity
} from "@app/module/gym/entity";

import {
  ProgramEntity,
  ProgramStepActivityEntity,
  ProgramStepActivityWorkingsessionEntity,
  ProgramStepActivityWorkingsessionWorkoutEntity,
  ProgramStepActivityWorkingsessionNutritionEntity,
} from "@app/module/program/entity";

import { UserInterestService } from "@app/module/user/service";

import {
  SocialAdvertisementEntity,
  SocialAffiliateLinkEntity,
  SocialAffiliateProgramEntity,
  SocialAffiliateSaleEntity,
  SocialChatMessageTextEntity,
  SocialChatMessageEntity,
  SocialChatEntity,
  SocialUpdateEntity,
  SocialNotificationEntity,
  SocialReviewEntity,
  SocialRatingsEntity,
  SocialAdvertisementInterestEntity,
  SocialUpdateContentEntity,
  SocialUpdateInterestEntity,
} from "./entity";
import {
  SocialAdvertisementController,
  SocialAffiliateLinkController,
  SocialAffiliateProgramController,
  SocialAffiliateSaleController,
  SocialChatMessageController,
  SocialChatController,
  SocialUpdateController,
  SocialNotificationController,
  SocialReviewController,
  SocialChatMessageTextController,
  SocialRatingsController,
  SocialAdvertisementInterestController,
  SocialUpdateContentController,
  SocialUpdateInterestController,
} from "./controller";
import {
  SocialAdvertisementService,
  SocialAffiliateLinkService,
  SocialAffiliateProgramService,
  SocialAffiliateSaleService,
  SocialChatMessageService,
  SocialChatMessageTextService,
  SocialChatService,
  SocialUpdateService,
  SocialNotificationService,
  SocialReviewService,
  SocialRatingsService,
  SocialAdvertisementInterestService,
  SocialUpdateContentService,
  SocialUpdateInterestService,
} from "./service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SocialAdvertisementEntity,
      SocialAffiliateLinkEntity,
      SocialAffiliateProgramEntity,
      SocialAffiliateSaleEntity,
      SocialChatMessageTextEntity,
      SocialChatMessageEntity,
      SocialChatEntity,
      SocialUpdateEntity,
      SocialNotificationEntity,
      SocialReviewEntity,
      SocialRatingsEntity,
      SocialAdvertisementInterestEntity,
      SocialUpdateContentEntity,
      SocialUpdateInterestEntity,

      // Importing base entities
      BaseNutritionEntity,
      BaseProgramGoalEntity,
      BaseSociologyEntity,
      BaseWorkoutEntity,

      // Importing user entities
      UserEntity,
      UserInterestEntity,

      // Importing gym entities
      GymEntity,
      GymManagerEntity,
      GymFollowerEntity,
      GymManagerFollowerEntity,

      // Importing program entities
      ProgramEntity,
      ProgramStepActivityEntity,
      ProgramStepActivityWorkingsessionEntity,
      ProgramStepActivityWorkingsessionWorkoutEntity,
      ProgramStepActivityWorkingsessionNutritionEntity,
    ]),
  ],
  controllers: [
    SocialAdvertisementController,
    SocialAffiliateLinkController,
    SocialAffiliateProgramController,
    SocialAffiliateSaleController,
    SocialChatMessageTextController,
    SocialChatMessageController,
    SocialChatController,
    SocialUpdateController,
    SocialNotificationController,
    SocialReviewController,
    SocialRatingsController,
    SocialAdvertisementInterestController,
    SocialUpdateContentController,
    SocialUpdateInterestController,
  ],
  providers: [
    SocialAdvertisementService,
    SocialAffiliateLinkService,
    SocialAffiliateProgramService,
    SocialAffiliateSaleService,
    SocialChatMessageTextService,
    SocialChatMessageService,
    SocialChatService,
    SocialUpdateService,
    SocialNotificationService,
    SocialReviewService,
    SocialRatingsService,
    SocialAdvertisementInterestService,
    SocialUpdateContentService,
    SocialUpdateInterestService,
    UserInterestService,
  ],
  exports: [
    SocialAdvertisementService,
    SocialAffiliateLinkService,
    SocialAffiliateProgramService,
    SocialAffiliateSaleService,
    SocialChatMessageTextService,
    SocialChatMessageService,
    SocialChatService,
    SocialUpdateService,
    SocialNotificationService,
    SocialReviewService,
    SocialRatingsService,
    SocialAdvertisementInterestService,
    SocialUpdateContentService,
    SocialUpdateInterestService,
    UserInterestService,
  ],
})
export class SocialModule {}
