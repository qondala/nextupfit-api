import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from "typeorm";
import { Coach } from "./coach.entity";
import { FitnessGoal } from "./fitness-goal.entity";
import { BodyMeasurement } from "./body-measurement.entity";
import { ContentRating } from "./content-rating.entity";
import { ContentReview } from "./content-review.entity";
import { Notification } from "./notification.entity";
import { CoachFollow } from "./coach-follow.entity";
import { Recommendation } from "./recommendation.entity";
import { UserProgram } from "./user-program.entity";
import { TrainingSession } from "./training-session.entity";
import { UserNutrition } from "./user-nutrition.entity";
import { UserNutritionProgress } from "./user-nutrition-progress.entity";
import { AffiliateLink } from "./affiliate-link.entity";
import { UserSubscription } from "./user-subscription.entity";
import { SessionReview } from "./session-review.entity";
import { PrivateDiscussion } from "./private-discussion.entity";
import { Payment } from "./payment.entity";
import { NutritionProgramReview } from "./nutrition-program-review.entity";
import { CoachRating } from "./coach-rating.entity";
import { Progress } from "./progress.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  profileImageUrl: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ nullable: true })
  verificationToken: boolean;

  @Column({ nullable: true })
  resetPasswordToken: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  lastLogin: Date;

  @OneToOne(() => Coach, (coach) => coach.user, {
    nullable: true,
  })
  coach: Coach;

  @OneToMany(() => FitnessGoal, (goal) => goal.user)
  goals: FitnessGoal[];

  @OneToMany(() => BodyMeasurement, (measurement) => measurement.user)
  bodyMeasurements: BodyMeasurement[];

  @OneToMany(() => ContentRating, (rating) => rating.user)
  contentRatings: ContentRating[];

  @OneToMany(() => ContentReview, (review) => review.user)
  contentReviews: ContentReview[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => CoachFollow, (follow) => follow.user)
  coachFollows: CoachFollow[];

  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.recommender,
  )
  recommendations: Recommendation[];

  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.recommendedToUser,
  )
  recommendationsReceived: Recommendation[];

  @OneToMany(() => UserProgram, (userProgram) => userProgram.user)
  userPrograms: UserProgram[];

  @OneToMany(() => TrainingSession, (trainingSession) => trainingSession.user)
  trainingSessions: TrainingSession[];

  @OneToMany(() => UserNutrition, (userNutrition) => userNutrition.user)
  userNutrition: UserNutrition[];

  @OneToMany(
    () => UserNutritionProgress,
    (userNutritionProgress) => userNutritionProgress.user,
  )
  userNutritionProgress: UserNutritionProgress[];

  @OneToMany(() => AffiliateLink, (affiliateLink) => affiliateLink.user)
  affiliateLinks: AffiliateLink[];

  @OneToMany(
    () => UserSubscription,
    (userSubscription) => userSubscription.user,
  )
  userSubscriptions: UserSubscription[];

  @OneToMany(() => SessionReview, (sessionReview) => sessionReview.user)
  sessionReviews: SessionReview[];

  @OneToMany(
    () => PrivateDiscussion,
    (privateDiscussion) => privateDiscussion.user,
  )
  privateDiscussions: PrivateDiscussion[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[];

  @OneToMany(
    () => NutritionProgramReview,
    (nutritionProgramReview) => nutritionProgramReview.user,
  )
  nutritionProgramReviews: any;

  @OneToMany(() => CoachRating, (coachRating) => coachRating.user)
  coachRatings: CoachRating[];

  @OneToMany(() => Progress, (progress) => progress.user)
  progress: Progress[];
}
