import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSessionReviewDto } from "./dto/create-sessionreview.dto";
import { UpdateSessionReviewDto } from "./dto/update-sessionreview.dto";
import { SessionReview } from "../../entities/session-review.entity";

@Injectable()
export class SessionReviewsService {
  constructor(
    @InjectRepository(SessionReview)
    private sessionReviewsRepository: Repository<SessionReview>,
  ) {}

  async create(
    createSessionReviewDto: CreateSessionReviewDto,
    userId: number,
  ): Promise<SessionReview> {
    const sessionReview = this.sessionReviewsRepository.create({
      ...createSessionReviewDto,
      user: { id: userId },
      session: { id: createSessionReviewDto.sessionId },
    });
    return this.sessionReviewsRepository.save(sessionReview);
  }

  async findAll(): Promise<SessionReview[]> {
    return this.sessionReviewsRepository.find({
      relations: ["user", "session"],
    });
  }

  async findOne(id: number): Promise<SessionReview> {
    const sessionReview = await this.sessionReviewsRepository.findOne({
      where: { id },
      relations: ["user", "session"],
    });
    if (!sessionReview) {
      throw new NotFoundException(`Session review with ID ${id} not found`);
    }
    return sessionReview;
  }

  async update(
    id: number,
    updateSessionReviewDto: UpdateSessionReviewDto,
    userId: number,
  ): Promise<SessionReview> {
    const sessionReview = await this.sessionReviewsRepository.preload({
      id,
      ...updateSessionReviewDto,
    });
    if (!sessionReview) {
      throw new NotFoundException(`Session review with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier son évaluation
    if (sessionReview.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this session review",
      );
    }
    return this.sessionReviewsRepository.save(sessionReview);
  }

  async remove(id: number, userId: number): Promise<void> {
    const sessionReview = await this.sessionReviewsRepository.findOne({
      where: { id },
    });
    if (!sessionReview) {
      throw new NotFoundException(`Session review with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer son évaluation
    if (sessionReview.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this session review",
      );
    }
    await this.sessionReviewsRepository.delete(id);
  }

  async searchSessionReviews(query: string): Promise<SessionReview[]> {
    const sessionReviews = await this.sessionReviewsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { session: { content: { title: `%${query}%` } } },
        { session: { content: { description: `%${query}%` } } },
        { reviewText: `%${query}%` },
      ],
      relations: ["user", "session"],
    });
    return sessionReviews;
  }

  async findByUser(userId: number): Promise<SessionReview[]> {
    const sessionReviews = await this.sessionReviewsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "session"],
    });
    if (!sessionReviews) {
      throw new NotFoundException(
        `Session reviews for user ${userId} not found`,
      );
    }
    return sessionReviews;
  }

  async findBySession(sessionId: number): Promise<SessionReview[]> {
    const sessionReviews = await this.sessionReviewsRepository.find({
      where: { session: { id: sessionId } },
      relations: ["user", "session"],
    });
    if (!sessionReviews) {
      throw new NotFoundException(
        `Session reviews for session ${sessionId} not found`,
      );
    }
    return sessionReviews;
  }
}
