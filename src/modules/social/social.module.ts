import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  GymEntity, 
  GymManagerOverviewEntity 
} from '@app/module/gym/entity';

import {
  ProgramEntity, 
  ProgramStepActivityEntity, 
  ProgramStepActivityWorkingsessionEntity, 
  ProgramStepActivityWorkingsessionWorkoutEntity 
} from '@app/module/program/entity';

import {
  SocialAdvertisementEntity,
  SocialAffiliateLinkEntity,
  SocialAffiliateProgramEntity,
  SocialAffiliateSaleEntity,
  SocialChatMessageTextEntity,
  SocialChatMessageEntity,
  SocialChatEntity,
  SocialNewsEntity,
  SocialNotificationEntity,
  SocialReviewEntity,
  SocialRatingsEntity
} from './entity';
import {
  SocialAdvertisementController,
  SocialAffiliateLinkController,
  SocialAffiliateProgramController,
  SocialAffiliateSaleController,
  SocialChatMessageController,
  SocialChatController,
  SocialNewsController,
  SocialNotificationController,
  SocialReviewController,
  SocialChatMessageTextController,
  SocialRatingsController
} from './controller';
import {
  SocialAdvertisementService,
  SocialAffiliateLinkService,
  SocialAffiliateProgramService,
  SocialAffiliateSaleService,
  SocialChatMessageService,
  SocialChatMessageTextService,
  SocialChatService,
  SocialNewsService,
  SocialNotificationService,
  SocialReviewService,
  SocialRatingsService
} from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // Gym
      GymEntity,
      GymManagerOverviewEntity,
      // Program
      ProgramEntity,
      ProgramStepActivityEntity,
      ProgramStepActivityWorkingsessionEntity,
      ProgramStepActivityWorkingsessionWorkoutEntity,
      // Social
      SocialAdvertisementEntity,
      SocialAffiliateLinkEntity,
      SocialAffiliateProgramEntity,
      SocialAffiliateSaleEntity,
      SocialChatMessageTextEntity,
      SocialChatMessageEntity,
      SocialChatEntity,
      SocialNewsEntity,
      SocialNotificationEntity,
      SocialReviewEntity,
      SocialRatingsEntity
    ])
  ],
  controllers: [
    SocialAdvertisementController,
    SocialAffiliateLinkController,
    SocialAffiliateProgramController,
    SocialAffiliateSaleController,
    SocialChatMessageTextController,
    SocialChatMessageController,
    SocialChatController,
    SocialNewsController,
    SocialNotificationController,
    SocialReviewController,
    SocialRatingsController
  ],
  providers: [
    SocialAdvertisementService,
    SocialAffiliateLinkService,
    SocialAffiliateProgramService,
    SocialAffiliateSaleService,
    SocialChatMessageTextService,
    SocialChatMessageService,
    SocialChatService,
    SocialNewsService,
    SocialNotificationService,
    SocialReviewService,
    SocialRatingsService
  ],
  exports: [
    SocialAdvertisementService,
    SocialAffiliateLinkService,
    SocialAffiliateProgramService,
    SocialAffiliateSaleService,
    SocialChatMessageTextService,
    SocialChatMessageService,
    SocialChatService,
    SocialNewsService,
    SocialNotificationService,
    SocialReviewService,
    SocialRatingsService
  ]
})
export class SocialModule {}
