import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Recommendation } from "../../entities/recommendation.entity";
import { Repository } from "typeorm";
import { CreateRecommendationDto } from "./dto/create-recommendation.dto";
import { UpdateRecommendationDto } from "./dto/update-recommendation.dto";

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(Recommendation)
    private recommendationsRepository: Repository<Recommendation>,
  ) {}

  async create(
    createRecommendationDto: CreateRecommendationDto,
    userId: number,
  ): Promise<Recommendation> {
    const recommendation = this.recommendationsRepository.create({
      ...createRecommendationDto,
      recommender: { id: userId },
      recommendedCoach: { id: createRecommendationDto.recommendedCoachId },
      recommendedToUser: { id: createRecommendationDto.recommendedToUserId },
    });
    return this.recommendationsRepository.save(recommendation);
  }

  async findAll(): Promise<Recommendation[]> {
    return this.recommendationsRepository.find({
      relations: ["recommender", "recommendedCoach", "recommendedToUser"],
    });
  }

  async findOne(id: number): Promise<Recommendation> {
    const recommendation = await this.recommendationsRepository.findOne({
      where: { id },
      relations: ["recommender", "recommendedCoach", "recommendedToUser"],
    });
    if (!recommendation) {
      throw new NotFoundException(`Recommendation with ID ${id} not found`);
    }
    return recommendation;
  }

  async update(
    id: number,
    updateRecommendationDto: UpdateRecommendationDto,
    userId: number,
  ): Promise<Recommendation> {
    const recommendation = await this.recommendationsRepository.preload({
      id,
      ...updateRecommendationDto,
    });
    if (!recommendation) {
      throw new NotFoundException(`Recommendation with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier sa recommandation
    if (recommendation.recommender.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this recommendation",
      );
    }
    return this.recommendationsRepository.save(recommendation);
  }

  async remove(id: number, userId: number): Promise<void> {
    const recommendation = await this.recommendationsRepository.findOne({
      where: { id },
    });
    if (!recommendation) {
      throw new NotFoundException(`Recommendation with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer sa recommandation
    if (recommendation.recommender.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this recommendation",
      );
    }
    await this.recommendationsRepository.delete(id);
  }

  async searchRecommendations(query: string): Promise<Recommendation[]> {
    const recommendations = await this.recommendationsRepository.find({
      where: [
        { recommender: { firstName: `%${query}%` } },
        { recommender: { lastName: `%${query}%` } },
        { recommender: { email: `%${query}%` } },
        { recommendedCoach: { user: { firstName: `%${query}%` } } },
        { recommendedCoach: { user: { lastName: `%${query}%` } } },
        { recommendedCoach: { user: { email: `%${query}%` } } },
        { recommendedToUser: { firstName: `%${query}%` } },
        { recommendedToUser: { lastName: `%${query}%` } },
        { recommendedToUser: { email: `%${query}%` } },
      ],
      relations: ["recommender", "recommendedCoach", "recommendedToUser"],
    });
    return recommendations;
  }

  async findByUser(userId: number): Promise<Recommendation[]> {
    const recommendations = await this.recommendationsRepository.find({
      where: { recommender: { id: userId } },
      relations: ["recommender", "recommendedCoach", "recommendedToUser"],
    });
    if (!recommendations) {
      throw new NotFoundException(
        `Recommendations for user ${userId} not found`,
      );
    }
    return recommendations;
  }

  async findByCoach(coachId: number): Promise<Recommendation[]> {
    const recommendations = await this.recommendationsRepository.find({
      where: { recommendedCoach: { id: coachId } },
      relations: ["recommender", "recommendedCoach", "recommendedToUser"],
    });
    if (!recommendations) {
      throw new NotFoundException(
        `Recommendations for coach ${coachId} not found`,
      );
    }
    return recommendations;
  }

  async findByRecommendedToUser(
    recommendedUserId: number,
  ): Promise<Recommendation[]> {
    const recommendations = await this.recommendationsRepository.find({
      where: { recommendedToUser: { id: recommendedUserId } },
      relations: ["recommender", "recommendedCoach", "recommendedToUser"],
    });
    if (!recommendations) {
      throw new NotFoundException(
        `Recommendations for recommended user ${recommendedUserId} not found`,
      );
    }
    return recommendations;
  }
}
