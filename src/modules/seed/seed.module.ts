import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SeedingService } from "./seed.service";
import { AffiliateLink } from "../../entities/affiliate-link.entity";
import { AffiliateProgram } from "../../entities/affiliate-program.entity";
import { AffiliateSale } from "../../entities/affiliate-sale.entity";
import { BodyMeasurement } from "../../entities/body-measurement.entity";
import { Category } from "../../entities/category.entity";
import { CoachFollow } from "../../entities/coach-follow.entity";
import { CoachQualification } from "../../entities/coach-qualification.entity";
import { CoachRating } from "../../entities/coach-rating.entity";
import { CoachSpecialization } from "../../entities/coach-specialization.entity";
import { Coach } from "../../entities/coach.entity";
import { ContentRating } from "../../entities/content-rating.entity";
import { ContentReview } from "../../entities/content-review.entity";
import { Content } from "../../entities/content.entity";
import { Exercise } from "../../entities/exercise.entity";
import { FitnessGoal } from "../../entities/fitness-goal.entity";
import { News } from "../../entities/news.entity";
import { NutritionDetail } from "../../entities/nutrition-detail.entity";
import { NutritionProgramReview } from "../../entities/nutrition-program-review.entity";
import { NutritionProgram } from "../../entities/nutrition-program.entity";
import { Payment } from "../../entities/payment.entity";
import { PerformanceRecord } from "../../entities/performance-record.entity";
import { PrivateDiscussion } from "../../entities/private-discussion.entity";
import { SessionReview } from "../../entities/session-review.entity";
import { SubscriptionPlan } from "../../entities/subscription-plan.entity";
import { TrainingContentLink } from "../../entities/training-content-link.entity";
import { TrainingSession } from "../../entities/training-session.entity";
import { UserNutritionProgress } from "../../entities/user-nutrition-progress.entity";
import { UserNutrition } from "../../entities/user-nutrition.entity";
import { UserProgram } from "../../entities/user-program.entity";
import { UserSubscription } from "../../entities/user-subscription.entity";
import { User } from "../../entities/user.entity";
import * as s from "../../entities/session.entity";
import { Notification } from "../../entities/notification.entity";
import { AppDataSource } from "../../database/data-source";
import { Challenge } from "../../entities/challenge.entity";
import { DatabaseModule } from "src/database/database.module";
import { Admin } from "../../entities/admin.entity";

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature(
      [
        User,
        Coach,
        Admin,
        Content,
        FitnessGoal,
        Category,
        BodyMeasurement,
        ContentRating,
        ContentReview,
        Notification,
        CoachFollow,
        CoachQualification,
        CoachSpecialization,
        CoachRating,
        PrivateDiscussion,
        News,
        s.Session,
        AffiliateProgram,
        AffiliateLink,
        AffiliateSale,
        Payment,
        UserProgram,
        TrainingContentLink,
        TrainingSession,
        Exercise,
        NutritionProgram,
        NutritionDetail,
        NutritionProgramReview,
        SessionReview,
        UserNutrition,
        UserNutritionProgress,
        SubscriptionPlan,
        UserSubscription,
        PerformanceRecord,
        Challenge,
      ],
      AppDataSource.options,
    ),
  ],
  providers: [SeedingService],
  exports: [SeedingService],
})
export class SeedModule {}
