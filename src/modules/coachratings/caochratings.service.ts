import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCoachRatingDto } from "./dto/create-coachrating.dto";
import { UpdateCoachRatingDto } from "./dto/update-coachrating.dto";
import { CoachRating } from "../../entities/coach-rating.entity";

@Injectable()
export class CoachRatingsService {
  constructor(
    @InjectRepository(CoachRating)
    private coachRatingsRepository: Repository<CoachRating>,
  ) {}

  async create(
    createCoachRatingDto: CreateCoachRatingDto,
    userId: number,
  ): Promise<CoachRating> {
    const coachRating = this.coachRatingsRepository.create({
      ...createCoachRatingDto,
      user: { id: userId },
      coach: { id: createCoachRatingDto.coachId },
    });
    return this.coachRatingsRepository.save(coachRating);
  }

  async findAll(): Promise<CoachRating[]> {
    return this.coachRatingsRepository.find({
      relations: ["user", "coach"],
    });
  }

  async findOne(id: number): Promise<CoachRating> {
    const coachRating = await this.coachRatingsRepository.findOne({
      where: { id },
      relations: ["user", "coach"],
    });
    if (!coachRating) {
      throw new NotFoundException(`Coach rating with ID ${id} not found`);
    }
    return coachRating;
  }

  async update(
    id: number,
    updateCoachRatingDto: UpdateCoachRatingDto,
    userId: number,
  ): Promise<CoachRating> {
    const coachRating = await this.coachRatingsRepository.preload({
      id,
      ...updateCoachRatingDto,
    });
    if (!coachRating) {
      throw new NotFoundException(`Coach rating with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier son évaluation
    if (coachRating.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this coach rating",
      );
    }
    return this.coachRatingsRepository.save(coachRating);
  }

  async remove(id: number, userId: number): Promise<void> {
    const coachRating = await this.coachRatingsRepository.findOne({
      where: { id },
    });
    if (!coachRating) {
      throw new NotFoundException(`Coach rating with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer son évaluation
    if (coachRating.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this coach rating",
      );
    }
    await this.coachRatingsRepository.delete(id);
  }

  async searchCoachRatings(query: string): Promise<CoachRating[]> {
    const coachRatings = await this.coachRatingsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { coach: { user: { firstName: `%${query}%` } } },
        { coach: { user: { lastName: `%${query}%` } } },
        { coach: { user: { email: `%${query}%` } } },
        { comment: `%${query}%` },
      ],
      relations: ["user", "coach"],
    });
    return coachRatings;
  }

  async findByUser(userId: number): Promise<CoachRating[]> {
    const coachRatings = await this.coachRatingsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "coach"],
    });
    if (!coachRatings) {
      throw new NotFoundException(`Coach ratings for user ${userId} not found`);
    }
    return coachRatings;
  }

  async findByCoach(coachId: number): Promise<CoachRating[]> {
    const coachRatings = await this.coachRatingsRepository.find({
      where: { coach: { id: coachId } },
      relations: ["user", "coach"],
    });
    if (!coachRatings) {
      throw new NotFoundException(
        `Coach ratings for coach ${coachId} not found`,
      );
    }
    return coachRatings;
  }
}
