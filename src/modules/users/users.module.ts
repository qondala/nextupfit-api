import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliateLink } from "../../entities/affiliate-link.entity";
import { BodyMeasurement } from "../../entities/body-measurement.entity";
import { CoachFollow } from "../../entities/coach-follow.entity";
import { Coach } from "../../entities/coach.entity";
import { ContentRating } from "../../entities/content-rating.entity";
import { ContentReview } from "../../entities/content-review.entity";
import { NutritionProgramReview } from "../../entities/nutrition-program-review.entity";
import { Payment } from "../../entities/payment.entity";
import { Recommendation } from "../../entities/recommendation.entity";
import { SessionReview } from "../../entities/session-review.entity";
import { TrainingSession } from "../../entities/training-session.entity";
import { UserNutritionProgress } from "../../entities/user-nutrition-progress.entity";
import { UserNutrition } from "../../entities/user-nutrition.entity";
import { UserProgram } from "../../entities/user-program.entity";
import { UserSubscription } from "../../entities/user-subscription.entity";
import { User } from "../../entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { Notification } from "../../entities/notification.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Coach,
      BodyMeasurement,
      ContentRating,
      ContentReview,
      Notification,
      CoachFollow,
      Recommendation,
      UserProgram,
      TrainingSession,
      UserNutrition,
      UserNutritionProgress,
      AffiliateLink,
      Payment,
      UserSubscription,
      SessionReview,
      NutritionProgramReview,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
