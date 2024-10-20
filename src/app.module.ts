import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { AffiliateLinksModule } from "./modules/affiliatelinks/affiliatelinks.module";
import { AffiliateProgramsModule } from "./modules/affiliateprogram/affiliateprogram.module";
import { AffiliateSalesModule } from "./modules/affiliatesales/affiliatesales.module";
import { AuthModule } from "./modules/auth/auth.module";
import { BodyMeasurementsModule } from "./modules/bodymeasurements/bodymeasurements.module";
import { CategoriesModule } from "./modules/categories/categories.module";
import { ChallengesModule } from "./modules/challenges/challenges.module";
import { CoachesModule } from "./modules/coaches/coaches.module";
import { CoachQualificationsModule } from "./modules/coachqualifications/coachqualifications.module";
import { CoachRatingsModule } from "./modules/coachratings/coachratings.module";
import { CoachSpecializationsModule } from "./modules/coachspecializations/coachspecializations.module";
import { CoachFollowsModule } from "./modules/coachfollows/coachfollows.module";
import { ContentModule } from "./modules/content/content.module";
import { ContentRatingsModule } from "./modules/contentratings/contentratings.module";
import { ContentReviewsModule } from "./modules/contentreviews/contentreviews.module";
import { GoalsModule } from "./modules/goals/goals.module";
import { NewsModule } from "./modules/news/news.module";
import { NotificationsModule } from "./modules/notifications/notifications.module";
import { PrivateDiscussionsModule } from "./modules/privatediscussions/privatediscussions.module";
import { ProgressModule } from "./modules/progress/progress.module";
import { RecommendationsModule } from "./modules/recommendations/recommendations.module";
import { SessionReviewsModule } from "./modules/sessionreviews/sessionreviews.module";
import { SessionsModule } from "./modules/sessions/sessions.module";
import { StagesModule } from "./modules/stages/stages.module";
import { SubscriptionPlansModule } from "./modules/subscriptionplans/subscriptionplans.module";
import { TrainingContentLinksModule } from "./modules/trainingcontentlinks/trainingcontentlinks.module";
import { TrainingSessionsModule } from "./modules/trainingsessions/trainingsessions.module";
import { UserNutritionProgressModule } from "./modules/usernutritionprogress/usernutritionprogress.module";
import { UserNutritionModule } from "./modules/usernutritions/usernutrition.module";
import { UserProgramsModule } from "./modules/userprograms/userprograms.module";
import { UsersModule } from "./modules/users/users.module";
import { UserSubscriptionsModule } from "./modules/usersubscriptions/usersubscriptions.module";
import { PaymentsModule } from "./modules/payments/payments.module";
import { SharedModule } from "./shared/shared.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { mailerConfig } from "./shared/services/mailer.config";
import { SeedModule } from "./modules/seed/seed.module";
import { UserChallengesModule } from "./modules/userchallenges/userchallenges.module";
import { HomeModule } from "./modules/home/home.module";
import { AdminModule } from "./modules/admin/admin.module";
import { CoachTransfersModule } from "./modules/coachtransfers/coachtransfers.module";
import { NutritionProgram } from "./entities/nutrition-program.entity";
import { NutritionProgramsModule } from "./modules/nutritionprograms/nutritionprogram.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Permet d'accéder aux variables d'environnement dans l'application entière
    }),
    DatabaseModule, // Import du module de base de données (TypeORM)
    SharedModule, // Import du module partagé
    MailerModule.forRoot(mailerConfig),
    CoachesModule,
    UsersModule,
    ContentModule,
    AuthModule,
    GoalsModule,
    ChallengesModule,
    StagesModule,
    SessionsModule,
    PaymentsModule,
    BodyMeasurementsModule,
    ProgressModule,
    NewsModule,
    NotificationsModule,
    CoachQualificationsModule,
    CoachSpecializationsModule,
    CoachFollowsModule,
    CoachRatingsModule,
    ContentRatingsModule,
    ContentReviewsModule,
    PrivateDiscussionsModule,
    RecommendationsModule,
    SessionReviewsModule,
    NutritionProgramsModule,
    UserNutritionModule,
    UserNutritionProgressModule,
    UserProgramsModule,
    TrainingContentLinksModule,
    TrainingSessionsModule,
    AffiliateProgramsModule,
    AffiliateLinksModule,
    AffiliateSalesModule,
    CategoriesModule,
    SubscriptionPlansModule,
    UserSubscriptionsModule,
    SeedModule,
    UserChallengesModule,
    AdminModule,
    HomeModule,
    CoachTransfersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
