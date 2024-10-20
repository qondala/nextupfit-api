import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Notification } from "../../entities/notification.entity";
import * as seedData from "./seed-data.json";
import * as argon2 from "argon2";
import * as s from "../../entities/session.entity";
import { AffiliateLink } from "../../entities/affiliate-link.entity";
import { AffiliateProgram } from "../../entities/affiliate-program.entity";
import { AffiliateSale } from "../../entities/affiliate-sale.entity";
import { BodyMeasurement } from "../../entities/body-measurement.entity";
import { Category } from "../../entities/category.entity";
import { CoachFollow } from "../../entities/coach-follow.entity";
import { CoachQualification } from "../../entities/coach-qualification.entity";
import { CoachRating } from "../../entities/coach-rating.entity";
import { CoachSpecialization } from "../../entities/coach-specialization.entity";
import { ContentRating } from "../../entities/content-rating.entity";
import { ContentReview } from "../../entities/content-review.entity";
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
import { Content } from "../../entities/content.entity";
import { Coach } from "../../entities/coach.entity";
import { Challenge } from "../../entities/challenge.entity";

@Injectable()
export class SeedingService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(FitnessGoal)
    private fitnessGoalsRepository: Repository<FitnessGoal>,
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
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
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
    await this.seedFitnessGoals();
    await this.seedContent();
    await this.seedBodyMeasurements();
    await this.seedContentRatings();
    await this.seedContentReviews();
    await this.seedNotifications();
    await this.seedChallenges();
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
    await this.seedNutritionPrograms();
    await this.seedUserPrograms();
    await this.seedTrainingContentLinks();
    await this.seedTrainingSessions();
    await this.seedExercises();
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
    const contents =
      seedData.find((data) => data.table === "content")?.data || [];
    for (const contentItem of contents) {
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
    const news = seedData.find((data) => data.table === "news").data || [];
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

  private async seedChallenges() {
    const challenges =
      seedData.find((data) => data.table === "challenges")?.data || [];
    for (const session of challenges) {
      await this.challengeRepository.save(session as any);
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

  private async seedExercises() {
    const exercises =
      seedData.find((data) => data.table === "exercises")?.data || [];
    for (const exerciseItem of exercises) {
      const goals = seedData.find(
        (item) =>
          item.table == "exercisegoals" &&
          item.data
            .map((e) => e.exerciseId)
            .includes(exercises.indexOf(exerciseItem as any)),
      );
      const nutritionPrograms =
        seedData.find(
          (item) =>
            item.table == "exercisenutritions" &&
            item.data
              .map((e) => e.exerciseId)
              .includes(exercises.indexOf(exerciseItem as any)),
        ) || [];
      const exercise: Exercise = {
        ...exerciseItem,
        nutritionPrograms: nutritionPrograms as any,
        goals: goals as any,
      } as any;
      await this.exerciseRepository.save(exercise as any);
    }
  }

  private async seedNutritionPrograms() {
    const nutritionPrograms =
      seedData.find((data) => data.table === "nutritionprograms")?.data || [];
    for (const nutritionProgram of nutritionPrograms) {
      await this.nutritionProgramRepository.save(nutritionProgram as any);
    }
    const np = await this.nutritionProgramRepository.find({
      relations: ["contents"],
    });
    console.log(np);
    console.table(np.map((n) => n.contents));
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
