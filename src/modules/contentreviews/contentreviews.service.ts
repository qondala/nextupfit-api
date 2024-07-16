import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateContentReviewDto } from "./dto/create-contentreview.dto";
import { UpdateContentReviewDto } from "./dto/update-contentreview.dto";
import { ContentReview } from "../../entities/content-review.entity";

@Injectable()
export class ContentReviewsService {
  constructor(
    @InjectRepository(ContentReview)
    private contentReviewsRepository: Repository<ContentReview>,
  ) {}

  async create(
    createContentReviewDto: CreateContentReviewDto,
    userId: number,
  ): Promise<ContentReview> {
    const contentReview = this.contentReviewsRepository.create({
      ...createContentReviewDto,
      user: { id: userId },
      content: { id: createContentReviewDto.contentId },
    });
    return this.contentReviewsRepository.save(contentReview);
  }

  async findAll(): Promise<ContentReview[]> {
    return this.contentReviewsRepository.find({
      relations: ["user", "content"],
    });
  }

  async findOne(id: number): Promise<ContentReview> {
    const contentReview = await this.contentReviewsRepository.findOne({
      where: { id },
      relations: ["user", "content"],
    });
    if (!contentReview) {
      throw new NotFoundException(`Content review with ID ${id} not found`);
    }
    return contentReview;
  }

  async update(
    id: number,
    updateContentReviewDto: UpdateContentReviewDto,
    userId: number,
  ): Promise<ContentReview> {
    const contentReview = await this.contentReviewsRepository.preload({
      id,
      ...updateContentReviewDto,
    });
    if (!contentReview) {
      throw new NotFoundException(`Content review with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier son évaluation
    if (contentReview.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this content review",
      );
    }
    return this.contentReviewsRepository.save(contentReview);
  }

  async remove(id: number, userId: number): Promise<void> {
    const contentReview = await this.contentReviewsRepository.findOne({
      where: { id },
    });
    if (!contentReview) {
      throw new NotFoundException(`Content review with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer son évaluation
    if (contentReview.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this content review",
      );
    }
    await this.contentReviewsRepository.delete(id);
  }

  async searchContentReviews(query: string): Promise<ContentReview[]> {
    const contentReviews = await this.contentReviewsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { content: { title: `%${query}%` } },
        { content: { description: `%${query}%` } },
        { reviewText: `%${query}%` },
      ],
      relations: ["user", "content"],
    });
    return contentReviews;
  }

  async findByUser(userId: number): Promise<ContentReview[]> {
    const contentReviews = await this.contentReviewsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "content"],
    });
    if (!contentReviews) {
      throw new NotFoundException(
        `Content reviews for user ${userId} not found`,
      );
    }
    return contentReviews;
  }

  async findByContent(contentId: number): Promise<ContentReview[]> {
    const contentReviews = await this.contentReviewsRepository.find({
      where: { content: { id: contentId } },
      relations: ["user", "content"],
    });
    if (!contentReviews) {
      throw new NotFoundException(
        `Content reviews for content ${contentId} not found`,
      );
    }
    return contentReviews;
  }
}
