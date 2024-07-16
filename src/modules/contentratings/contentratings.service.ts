import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateContentRatingDto } from "./dto/create-contentrating.dto";
import { UpdateContentRatingDto } from "./dto/update-contentrating.dto";
import { ContentRating } from "../../entities/content-rating.entity";

@Injectable()
export class ContentRatingsService {
  constructor(
    @InjectRepository(ContentRating)
    private contentRatingsRepository: Repository<ContentRating>,
  ) {}

  async create(
    createContentRatingDto: CreateContentRatingDto,
    userId: number,
  ): Promise<ContentRating> {
    const contentRating = this.contentRatingsRepository.create({
      ...createContentRatingDto,
      user: { id: userId },
      content: { id: createContentRatingDto.contentId },
    });
    return this.contentRatingsRepository.save(contentRating);
  }

  async findAll(): Promise<ContentRating[]> {
    return this.contentRatingsRepository.find({
      relations: ["user", "content"],
    });
  }

  async findOne(id: number): Promise<ContentRating> {
    const contentRating = await this.contentRatingsRepository.findOne({
      where: { id },
      relations: ["user", "content"],
    });
    if (!contentRating) {
      throw new NotFoundException(`Content rating with ID ${id} not found`);
    }
    return contentRating;
  }

  async update(
    id: number,
    updateContentRatingDto: UpdateContentRatingDto,
    userId: number,
  ): Promise<ContentRating> {
    const contentRating = await this.contentRatingsRepository.preload({
      id,
      ...updateContentRatingDto,
    });
    if (!contentRating) {
      throw new NotFoundException(`Content rating with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier son évaluation
    if (contentRating.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this content rating",
      );
    }
    return this.contentRatingsRepository.save(contentRating);
  }

  async remove(id: number, userId: number): Promise<void> {
    const contentRating = await this.contentRatingsRepository.findOne({
      where: { id },
    });
    if (!contentRating) {
      throw new NotFoundException(`Content rating with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer son évaluation
    if (contentRating.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this content rating",
      );
    }
    await this.contentRatingsRepository.delete(id);
  }

  async searchContentRatings(query: string): Promise<ContentRating[]> {
    const contentRatings = await this.contentRatingsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { content: { title: `%${query}%` } },
        { content: { description: `%${query}%` } },
        { comment: `%${query}%` },
      ],
      relations: ["user", "content"],
    });
    return contentRatings;
  }

  async findByUser(userId: number): Promise<ContentRating[]> {
    const contentRatings = await this.contentRatingsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "content"],
    });
    if (!contentRatings) {
      throw new NotFoundException(
        `Content ratings for user ${userId} not found`,
      );
    }
    return contentRatings;
  }

  async findByContent(contentId: number): Promise<ContentRating[]> {
    const contentRatings = await this.contentRatingsRepository.find({
      where: { content: { id: contentId } },
      relations: ["user", "content"],
    });
    if (!contentRatings) {
      throw new NotFoundException(
        `Content ratings for content ${contentId} not found`,
      );
    }
    return contentRatings;
  }
}
