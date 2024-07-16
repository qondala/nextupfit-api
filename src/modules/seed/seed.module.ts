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
import { ContentGoal } from "../../entities/content-goal.entity";
import { ContentNutrition } from "../../entities/content-nutrition.entity";
import { ContentRating } from "../../entities/content-rating.entity";
import { ContentReview } from "../../entities/content-review.entity";
import { Content } from "../../entities/content.entity";
import { ExerciseGoal } from "../../entities/exercise-goal.entity";
import { ExerciseNutrition } from "../../entities/exercise-nutrition.entity";
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

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        User,
        Coach,
        Content,
        FitnessGoal,
        ContentGoal,
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
        ExerciseGoal,
        Exercise,
        ExerciseNutrition,
        ContentNutrition,
        NutritionProgram,
        NutritionDetail,
        NutritionProgramReview,
        SessionReview,
        UserNutrition,
        UserNutritionProgress,
        SubscriptionPlan,
        UserSubscription,
        PerformanceRecord,
      ],
      AppDataSource,
    ),
  ],
  providers: [SeedingService],
  exports: [SeedingService],
})
export class SeedModule {}
