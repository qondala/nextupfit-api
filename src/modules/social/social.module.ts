import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  SocialReviewEntity
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
  SocialChatMessageTextController
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
  SocialReviewService
} from './service';

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
      SocialNewsEntity,
      SocialNotificationEntity,
      SocialReviewEntity
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
    SocialReviewController
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
    SocialReviewService
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
    SocialReviewService
  ]
})
export class SocialModule {}
