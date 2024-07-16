import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "../../entities/notification.entity";
import * as seedData from "./seed-data.json";
import * as argon2 from "argon2";
import * as s from "src/entities/session.entity";
import { AffiliateLink } from "src/entities/affiliate-link.entity";
import { AffiliateProgram } from "src/entities/affiliate-program.entity";
import { AffiliateSale } from "src/entities/affiliate-sale.entity";
import { BodyMeasurement } from "src/entities/body-measurement.entity";
import { Category } from "src/entities/category.entity";
import { CoachFollow } from "src/entities/coach-follow.entity";
import { CoachQualification } from "src/entities/coach-qualification.entity";
import { CoachRating } from "src/entities/coach-rating.entity";
import { CoachSpecialization } from "src/entities/coach-specialization.entity";
import { ContentGoal } from "src/entities/content-goal.entity";
import { ContentNutrition } from "src/entities/content-nutrition.entity";
import { ContentRating } from "src/entities/content-rating.entity";
import { ContentReview } from "src/entities/content-review.entity";
import { ExerciseGoal } from "src/entities/exercise-goal.entity";
import { ExerciseNutrition } from "src/entities/exercise-nutrition.entity";
import { Exercise } from "src/entities/exercise.entity";
import { FitnessGoal } from "src/entities/fitness-goal.entity";
import { News } from "src/entities/news.entity";
import { NutritionDetail } from "src/entities/nutrition-detail.entity";
import { NutritionProgramReview } from "src/entities/nutrition-program-review.entity";
import { NutritionProgram } from "src/entities/nutrition-program.entity";
import { Payment } from "src/entities/payment.entity";
import { PerformanceRecord } from "src/entities/performance-record.entity";
import { PrivateDiscussion } from "src/entities/private-discussion.entity";
import { SessionReview } from "src/entities/session-review.entity";
import { SubscriptionPlan } from "src/entities/subscription-plan.entity";
import { TrainingContentLink } from "src/entities/training-content-link.entity";
import { TrainingSession } from "src/entities/training-session.entity";
import { UserNutritionProgress } from "src/entities/user-nutrition-progress.entity";
import { UserNutrition } from "src/entities/user-nutrition.entity";
import { UserProgram } from "src/entities/user-program.entity";
import { UserSubscription } from "src/entities/user-subscription.entity";
import { User } from "src/entities/user.entity";
import { Content } from "src/entities/content.entity";
import { Coach } from "src/entities/coach.entity";

@Injectable()
export class SeedingService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(FitnessGoal)
    private fitnessGoalsRepository: Repository<FitnessGoal>,
    @InjectRepository(ContentGoal)
    private contentGoalsRepository: Repository<ContentGoal>,
    @InjectRepository(BodyMeasurement)
    private bodyMeasurementsRepository: Repository<BodyMeasurement>,
    @InjectRepository(ContentRating)
    private contentRatingsRepository: Repository<ContentRating>,
    @InjectRepository(ContentReview)
    private contentReviewsRepository: Repository<ContentReview>,
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(CoachFollow)
    private coachFollowsRepository: Repository<CoachFollow>,
    @InjectRepository(CoachQualification)
    private coachQualificationsRepository: Repository<CoachQualification>,
    @InjectRepository(CoachSpecialization)
    private coachSpecializationsRepository: Repository<CoachSpecialization>,
    @InjectRepository(CoachRating)
    private coachRatingRepository: Repository<CoachRating>,
    @InjectRepository(PrivateDiscussion)
    private privateDiscussionRepository: Repository<PrivateDiscussion>,
    @InjectRepository(News)
    private newsRepository: Repository<News>,
    @InjectRepository(s.Session)
    private sessionRepository: Repository<s.Session>,
    @InjectRepository(AffiliateProgram)
    private affiliateProgramRepository: Repository<AffiliateProgram>,
    @InjectRepository(AffiliateLink)
    private affiliateLinkRepository: Repository<AffiliateLink>,
    @InjectRepository(AffiliateSale)
    private affiliateSaleRepository: Repository<AffiliateSale>,
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(UserProgram)
    private userProgramRepository: Repository<UserProgram>,
    @InjectRepository(TrainingContentLink)
    private trainingContentLinkRepository: Repository<TrainingContentLink>,
    @InjectRepository(TrainingSession)
    private trainingSessionRepository: Repository<TrainingSession>,
    @InjectRepository(ExerciseGoal)
    private exerciseGoalRepository: Repository<ExerciseGoal>,
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(ExerciseNutrition)
    private exerciseNutritionRepository: Repository<ExerciseNutrition>,
    @InjectRepository(ContentNutrition)
    private contentNutritionRepository: Repository<ContentNutrition>,
    @InjectRepository(NutritionProgram)
    private nutritionProgramRepository: Repository<NutritionProgram>,
    @InjectRepository(NutritionDetail)
    private nutritionDetailRepository: Repository<NutritionDetail>,
    @InjectRepository(NutritionProgramReview)
    private nutritionProgramReviewRepository: Repository<NutritionProgramReview>,
    @InjectRepository(SessionReview)
    private sessionReviewRepository: Repository<SessionReview>,
    @InjectRepository(UserNutrition)
    private userNutritionRepository: Repository<UserNutrition>,
    @InjectRepository(UserNutritionProgress)
    private userNutritionProgressRepository: Repository<UserNutritionProgress>,
    @InjectRepository(SubscriptionPlan)
    private subscriptionPlanRepository: Repository<SubscriptionPlan>,
    @InjectRepository(UserSubscription)
    private userSubscriptionRepository: Repository<UserSubscription>,
    @InjectRepository(PerformanceRecord)
    private performanceRecordRepository: Repository<PerformanceRecord>,
  ) {}

  async seed() {
    await this.seedCategories();
    await this.seedUsers();
    await this.seedCoaches();
    await this.seedContent();
    await this.seedFitnessGoals();
    await this.seedContentGoals();
    await this.seedBodyMeasurements();
    await this.seedContentRatings();
    await this.seedContentReviews();
    await this.seedNotifications();
    await this.seedCoachFollows();
    await this.seedCoachQualifications();
    await this.seedCoachSpecializations();
    await this.seedCoachRatings();
    await this.seedPrivateDiscussions();
    await this.seedNews();
    await this.seedSessions();
    await this.seedAffiliatePrograms();
    await this.seedAffiliateLinks();
    await this.seedAffiliateSales();
    await this.seedPayments();
    await this.seedUserPrograms();
    await this.seedTrainingContentLinks();
    await this.seedTrainingSessions();
    await this.seedExerciseGoals();
    await this.seedExercises();
    await this.seedExerciseNutrition();
    await this.seedContentNutrition();
    await this.seedNutritionPrograms();
    await this.seedNutritionDetails();
    await this.seedNutritionProgramReviews();
    await this.seedSessionReviews();
    await this.seedUserNutrition();
    await this.seedUserNutritionProgress();
    await this.seedSubscriptionPlans();
    await this.seedUserSubscriptions();
    await this.seedPerformanceRecords();
  }

  private async seedCategories() {
    const categories =
      seedData.find((data) => data.table === "categories")?.data || [];
    for (const category of categories) {
      await this.categoriesRepository.save(category as any);
    }
  }

  private async seedUsers() {
    const users = seedData.find((data) => data.table === "users")?.data || [];
    for (const user of users) {
      if (!(await this.usersRepository.findOneBy({ email: user["email"] }))) {
        const hashedPassword = await argon2.hash(user["password"]);
        const newUser = this.usersRepository.create({
          ...user,
          passwordHash: hashedPassword,
          isEmailVerified: true,
        });
        await this.usersRepository.save(newUser as any);
      }
    }
  }

  private async seedCoaches() {
    const coaches =
      seedData.find((data) => data.table === "coaches")?.data || [];
    for (const coach of coaches) {
      await this.coachRepository.save(coach as any);
    }
  }

  private async seedContent() {
    const content =
      seedData.find((data) => data.table === "content")?.data || [];
    for (const contentItem of content) {
      await this.contentRepository.save(contentItem as any);
    }
  }

  private async seedFitnessGoals() {
    const fitnessGoals =
      seedData.find((data) => data.table === "fitnessgoals")?.data || [];
    for (const fitnessGoal of fitnessGoals) {
      await this.fitnessGoalsRepository.save(fitnessGoal as any);
    }
  }

  private async seedContentGoals() {
    const contentGoals =
      seedData.find((data) => data.table === "contentgoals")?.data || [];
    for (const contentGoal of contentGoals) {
      await this.contentGoalsRepository.save(contentGoal as any);
    }
  }

  private async seedBodyMeasurements() {
    const bodyMeasurements =
      seedData.find((data) => data.table === "bodymeasurements")?.data || [];
    for (const bodyMeasurement of bodyMeasurements) {
      await this.bodyMeasurementsRepository.save(bodyMeasurement as any);
    }
  }

  private async seedContentRatings() {
    const contentRatings =
      seedData.find((data) => data.table === "contentratings")?.data || [];
    for (const contentRating of contentRatings) {
      await this.contentRatingsRepository.save(contentRating as any);
    }
  }

  private async seedContentReviews() {
    const contentReviews =
      seedData.find((data) => data.table === "contentreviews")?.data || [];
    for (const contentReview of contentReviews) {
      await this.contentReviewsRepository.save(contentReview as any);
    }
  }

  private async seedNotifications() {
    const notifications =
      seedData.find((data) => data.table === "notifications")?.data || [];
    for (const notification of notifications) {
      await this.notificationsRepository.save(notification as any);
    }
  }

  private async seedCoachFollows() {
    const coachFollows =
      seedData.find((data) => data.table === "coachfollows")?.data || [];
    for (const coachFollow of coachFollows) {
      await this.coachFollowsRepository.save(coachFollow as any);
    }
  }

  private async seedCoachQualifications() {
    const coachQualifications =
      seedData.find((data) => data.table === "coachqualifications")?.data || [];
    for (const coachQualification of coachQualifications) {
      await this.coachQualificationsRepository.save(coachQualification as any);
    }
  }

  private async seedCoachSpecializations() {
    const coachSpecializations =
      seedData.find((data) => data.table === "coachspecializations")?.data ||
      [];
    for (const coachSpecialization of coachSpecializations) {
      await this.coachSpecializationsRepository.save(
        coachSpecialization as any,
      );
    }
  }

  private async seedCoachRatings() {
    const coachRatings =
      seedData.find((data) => data.table === "coachratings")?.data || [];
    for (const coachRating of coachRatings) {
      await this.coachRatingRepository.save(coachRating as any);
    }
  }

  private async seedPrivateDiscussions() {
    const privateDiscussions =
      seedData.find((data) => data.table === "privatediscussions")?.data || [];
    for (const privateDiscussion of privateDiscussions) {
      await this.privateDiscussionRepository.save(privateDiscussion as any);
    }
  }

  private async seedNews() {
    const news = seedData.find((data) => data.table === "news")?.data || [];
    for (const newsItem of news) {
      await this.newsRepository.save(newsItem as any);
    }
  }

  private async seedSessions() {
    const sessions =
      seedData.find((data) => data.table === "sessions")?.data || [];
    for (const session of sessions) {
      await this.sessionRepository.save(session as any);
    }
  }

  private async seedAffiliatePrograms() {
    const affiliatePrograms =
      seedData.find((data) => data.table === "affiliateprograms")?.data || [];
    for (const affiliateProgram of affiliatePrograms) {
      await this.affiliateProgramRepository.save(affiliateProgram as any);
    }
  }

  private async seedAffiliateLinks() {
    const affiliateLinks =
      seedData.find((data) => data.table === "affiliatelinks")?.data || [];
    for (const affiliateLink of affiliateLinks) {
      await this.affiliateLinkRepository.save(affiliateLink as any);
    }
  }

  private async seedAffiliateSales() {
    const affiliateSales =
      seedData.find((data) => data.table === "affiliatesales")?.data || [];
    for (const affiliateSale of affiliateSales) {
      await this.affiliateSaleRepository.save(affiliateSale as any);
    }
  }

  private async seedPayments() {
    const payments =
      seedData.find((data) => data.table === "payments")?.data || [];
    for (const payment of payments) {
      await this.paymentRepository.save(payment as any);
    }
  }

  private async seedUserPrograms() {
    const userPrograms =
      seedData.find((data) => data.table === "userprograms")?.data || [];
    for (const userProgram of userPrograms) {
      await this.userProgramRepository.save(userProgram as any);
    }
  }

  private async seedTrainingContentLinks() {
    const trainingContentLinks =
      seedData.find((data) => data.table === "trainingcontentlinks")?.data ||
      [];
    for (const trainingContentLink of trainingContentLinks) {
      await this.trainingContentLinkRepository.save(trainingContentLink as any);
    }
  }

  private async seedTrainingSessions() {
    const trainingSessions =
      seedData.find((data) => data.table === "trainingsessions")?.data || [];
    for (const trainingSession of trainingSessions) {
      await this.trainingSessionRepository.save(trainingSession as any);
    }
  }

  private async seedExerciseGoals() {
    const exerciseGoals =
      seedData.find((data) => data.table === "exercisegoals")?.data || [];
    for (const exerciseGoal of exerciseGoals) {
      await this.exerciseGoalRepository.save(exerciseGoal as any);
    }
  }

  private async seedExercises() {
    const exercises =
      seedData.find((data) => data.table === "exercises")?.data || [];
    for (const exercise of exercises) {
      await this.exerciseRepository.save(exercise as any);
    }
  }

  private async seedExerciseNutrition() {
    const exerciseNutrition =
      seedData.find((data) => data.table === "exercisenutrition")?.data || [];
    for (const exerciseNutritionItem of exerciseNutrition) {
      await this.exerciseNutritionRepository.save(exerciseNutritionItem as any);
    }
  }

  private async seedContentNutrition() {
    const contentNutrition =
      seedData.find((data) => data.table === "contentnutrition")?.data || [];
    for (const contentNutritionItem of contentNutrition) {
      await this.contentNutritionRepository.save(contentNutritionItem as any);
    }
  }

  private async seedNutritionPrograms() {
    const nutritionPrograms =
      seedData.find((data) => data.table === "nutritionprograms")?.data || [];
    for (const nutritionProgram of nutritionPrograms) {
      await this.nutritionProgramRepository.save(nutritionProgram as any);
    }
  }

  private async seedNutritionDetails() {
    const nutritionDetails =
      seedData.find((data) => data.table === "nutritiondetails")?.data || [];
    for (const nutritionDetail of nutritionDetails) {
      await this.nutritionDetailRepository.save(nutritionDetail as any);
    }
  }

  private async seedNutritionProgramReviews() {
    const nutritionProgramReviews =
      seedData.find((data) => data.table === "nutritionprogramreviews")?.data ||
      [];
    for (const nutritionProgramReview of nutritionProgramReviews) {
      await this.nutritionProgramReviewRepository.save(
        nutritionProgramReview as any,
      );
    }
  }

  private async seedSessionReviews() {
    const sessionReviews =
      seedData.find((data) => data.table === "sessionreviews")?.data || [];
    for (const sessionReview of sessionReviews) {
      await this.sessionReviewRepository.save(sessionReview as any);
    }
  }

  private async seedUserNutrition() {
    const userNutrition =
      seedData.find((data) => data.table === "usernutrition")?.data || [];
    for (const userNutritionItem of userNutrition) {
      await this.userNutritionRepository.save(userNutritionItem as any);
    }
  }

  private async seedUserNutritionProgress() {
    const userNutritionProgress =
      seedData.find((data) => data.table === "usernutritionprogress")?.data ||
      [];
    for (const userNutritionProgressItem of userNutritionProgress) {
      await this.userNutritionProgressRepository.save(
        userNutritionProgressItem as any,
      );
    }
  }

  private async seedSubscriptionPlans() {
    const subscriptionPlans =
      seedData.find((data) => data.table === "subscriptionplans")?.data || [];
    for (const subscriptionPlan of subscriptionPlans) {
      await this.subscriptionPlanRepository.save(subscriptionPlan as any);
    }
  }

  private async seedUserSubscriptions() {
    const userSubscriptions =
      seedData.find((data) => data.table === "usersubscriptions")?.data || [];
    for (const userSubscription of userSubscriptions) {
      await this.userSubscriptionRepository.save(userSubscription as any);
    }
  }

  private async seedPerformanceRecords() {
    const performanceRecords =
      seedData.find((data) => data.table === "performancerecords")?.data || [];
    for (const performanceRecord of performanceRecords) {
      await this.performanceRecordRepository.save(performanceRecord as any);
    }
  }
}
