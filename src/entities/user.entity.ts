import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  CreateDateColumn,
} from "typeorm";
import { Coach } from "./coach.entity";
import { Admin } from "./admin.entity";
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
import { UserChallenge } from "./user-challenge.entity";
import { Employee } from "./employee.entity";

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

  @Column({ nullable: true })
  phoneNumber: string;

  @CreateDateColumn({ nullable: true })
  birthDate: Date;

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

  @OneToOne(() => Admin, (admin) => admin.user, {
    nullable: true,
  })
  admin: Admin;

  @OneToOne(() => Admin, (employee) => employee.user, {
    nullable: true,
  })
  employee: Employee;

  @OneToMany(() => FitnessGoal, (goal) => goal.user, {
    cascade: true,
  })
  goals: FitnessGoal[];

  @OneToMany(() => BodyMeasurement, (measurement) => measurement.user, {
    cascade: true,
  })
  bodyMeasurements: BodyMeasurement[];

  @OneToMany(() => ContentRating, (rating) => rating.user, {
    cascade: true,
  })
  contentRatings: ContentRating[];

  @OneToMany(() => ContentReview, (review) => review.user, {
    cascade: true,
  })
  contentReviews: ContentReview[];

  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: true,
  })
  notifications: Notification[];

  @OneToMany(() => CoachFollow, (follow) => follow.user, {
    cascade: true,
  })
  coachFollows: CoachFollow[];

  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.recommender,
    { cascade: true },
  )
  recommendations: Recommendation[];

  @OneToMany(
    () => Recommendation,
    (recommendation) => recommendation.recommendedToUser,
  )
  recommendationsReceived: Recommendation[];

  @OneToMany(() => UserProgram, (userProgram) => userProgram.user, {})
  userPrograms: UserProgram[];

  @OneToMany(
    () => TrainingSession,
    (trainingSession) => trainingSession.user,
    {},
  )
  trainingSessions: TrainingSession[];

  @OneToMany(() => UserNutrition, (userNutrition) => userNutrition.user)
  userNutrition: UserNutrition[];

  @OneToMany(
    () => UserNutritionProgress,
    (userNutritionProgress) => userNutritionProgress.user,
    { cascade: true },
  )
  userNutritionProgress: UserNutritionProgress[];

  @OneToMany(() => AffiliateLink, (affiliateLink) => affiliateLink.user, {
    cascade: true,
  })
  affiliateLinks: AffiliateLink[];

  @OneToMany(
    () => UserSubscription,
    (userSubscription) => userSubscription.user,
    { cascade: true },
  )
  userSubscriptions: UserSubscription[];

  @OneToMany(() => SessionReview, (sessionReview) => sessionReview.user, {
    cascade: true,
  })
  sessionReviews: SessionReview[];

  @OneToMany(
    () => PrivateDiscussion,
    (privateDiscussion) => privateDiscussion.user,
    { cascade: true },
  )
  privateDiscussions: PrivateDiscussion[];

  @OneToMany(() => Payment, (payment) => payment.user, {
    cascade: true,
  })
  payments: Payment[];

  @OneToMany(
    () => NutritionProgramReview,
    (nutritionProgramReview) => nutritionProgramReview.user,
    { cascade: true },
  )
  nutritionProgramReviews: any;

  @OneToMany(() => CoachRating, (coachRating) => coachRating.user, {
    cascade: true,
  })
  coachRatings: CoachRating[];

  @OneToMany(() => Progress, (progress) => progress.user, {
    cascade: true,
  })
  progress: Progress[];

  @OneToMany(() => UserChallenge, (challenge) => challenge.user, {
    cascade: true,
  })
  challenges: UserChallenge[];
}
