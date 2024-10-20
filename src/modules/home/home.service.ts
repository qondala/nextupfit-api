import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Challenge } from "src/entities/challenge.entity";
import { TrainingSession } from "src/entities/training-session.entity";
import { Session } from "src/entities/session.entity";
import { Repository } from "typeorm";
import { Coach } from "src/entities/coach.entity";
import { NutritionProgram } from "src/entities/nutrition-program.entity";

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @InjectRepository(Challenge)
    private challengeRepository: Repository<Challenge>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(TrainingSession)
    private trainingSessionRepository: Repository<TrainingSession>,
    @InjectRepository(NutritionProgram)
    private nutritionProgramRepository: Repository<NutritionProgram>,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async getSessions(
    page: number,
    pageSize: number,
  ): Promise<PaginationResult<Session>> {
    const skip = page * pageSize;
    const [items, total] = await this.sessionRepository.findAndCount({
      relations: ["content", "coach"],
      skip: skip,
      take: pageSize,
    });
    return { items, total };
  }

  async getTrendingSessions(): Promise<Session[]> {
    return this.sessionRepository.find({
      relations: ["content", "coach"],
      order: { content: { averageRating: "DESC" } }, // Trier par note moyenne décroissante
      take: 10, // Limiter à 7 sessions
    });
  }

  async getChallenges(
    page: number = 0,
    pageSize: number = 10,
  ): Promise<PaginationResult<Challenge>> {
    const skip = page * pageSize;
    const [items, total] = await this.challengeRepository.findAndCount({
      relations: ["content", "coach"],
      skip: skip,
    });
    return { items, total };
  }

  // async getNutritionSessions(): Promise<Session[]> {
  //   return this.sessionRepository.find({
  //     relations: ["content"],
  //     where: { content: { contentType: "nutrition" } },
  //     take: 7, // Limiter à 7 sessions
  //   });
  // }

  async getNewSessions(userId: number): Promise<Session[]> {
    const trainingSessions = await this.trainingSessionRepository.find({
      where: { user: { id: userId } },
      relations: ["session"],
    });
    const trainingSessionIds = trainingSessions.map((ts) => ts.session.id);
    if (trainingSessionIds.length > 0) {
      return this.sessionRepository
        .createQueryBuilder("session")
        .where("session.id NOT IN (:...trainingSessionIds)", {
          trainingSessionIds,
        })
        .leftJoinAndSelect("session.coach", "coaches")
        .leftJoinAndSelect("session.content", "contents")
        .take(10)
        .getMany();
    } else {
      return this.sessionRepository.find({
        take: 10,
        relations: ["coach", "content"],
      });
    }
  }

  async getFeaturedTrainers(): Promise<Coach[]> {
    return this.coachRepository.find({
      relations: ["user"],
      order: { ratingAvg: "DESC" },
      take: 12,
    });
  }

  async getListedTrainers(
    page: number = 0,
    pageSize: number = 10,
  ): Promise<PaginationResult<Coach>> {
    const skip = page * pageSize;
    const [items, total] = await this.coachRepository.findAndCount({
      relations: ["user"],
      order: { ratingAvg: "DESC" },
      skip: skip,
    });
    return { items, total };
  }

  async getNutritionSessions(
    page: number,
    pageSize: number,
  ): Promise<PaginationResult<NutritionProgram>> {
    const skip = page * pageSize;
    const [items, total] = await this.nutritionProgramRepository.findAndCount({
      relations: ["nutritionDetails", "reviews", "contents", "coach"],
      skip,
      take: pageSize,
    });
    return { items, total };
  }

  async getNutritionChallenges(
    page: number,
    pageSize: number,
  ): Promise<PaginationResult<NutritionProgram>> {
    const skip = page * pageSize;
    const [items, total] = await this.nutritionProgramRepository.findAndCount({
      relations: ["nutritionDetails", "reviews", "contents", "coach"],
      skip,
      take: pageSize,
    });
    return { items, total };
  }

  async getHomeData(
    page: number,
    pageSize: number,
    userId?: number,
  ): Promise<any> {
    const [
      categories,
      allSessions,
      trendingSessions,
      listedChallenges,
      nutritionSessions,
      // nutritionChallenges,
      featuredTrainers,
      listedTrainers,
      // advertisements,
    ] = await Promise.all([
      this.getCategories(),
      this.getSessions(page, pageSize),
      this.getTrendingSessions(),
      this.getChallenges(),
      this.getNutritionSessions(page, pageSize),
      // this.getNutritionChallenges(page, pageSize),
      this.getFeaturedTrainers(),
      this.getListedTrainers(),
      // this.getAdvertisements(),
    ]);

    let newSessions: Session[];
    if (userId) {
      newSessions = await this.getNewSessions(userId);
    } else {
      newSessions = [];
    }

    const hasMoreData = allSessions.items.length === pageSize; // Check if there's more data

    return {
      categories,
      allSessions,
      trendingSessions,
      listedChallenges,
      nutritionSessions,
      // nutritionChallenges,
      newSessions,
      featuredTrainers,
      listedTrainers,
      hasMoreData,
    };
  }
}
