import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNutritionProgramReviewDto } from "./dto/create-nutritionprogramreview.dto";
import { NutritionProgramReview } from "../../entities/nutrition-program-review.entity";
import { UpdateNutritionProgramReviewDto } from "./dto/update.nutritionprogramreview.dto";

@Injectable()
export class NutritionProgramReviewsService {
  constructor(
    @InjectRepository(NutritionProgramReview)
    private nutritionProgramReviewsRepository: Repository<NutritionProgramReview>,
  ) {}

  async create(
    createNutritionProgramReviewDto: CreateNutritionProgramReviewDto,
    userId: number,
  ): Promise<NutritionProgramReview> {
    const nutritionProgramReview =
      this.nutritionProgramReviewsRepository.create({
        ...createNutritionProgramReviewDto,
        user: { id: userId },
        nutritionProgram: {
          id: createNutritionProgramReviewDto.nutritionProgramId,
        },
      });
    return this.nutritionProgramReviewsRepository.save(nutritionProgramReview);
  }

  async findAll(): Promise<NutritionProgramReview[]> {
    return this.nutritionProgramReviewsRepository.find({
      relations: ["user", "nutritionProgram"],
    });
  }

  async findOne(id: number): Promise<NutritionProgramReview> {
    const nutritionProgramReview =
      await this.nutritionProgramReviewsRepository.findOne({
        where: { id },
        relations: ["user", "nutritionProgram"],
      });
    if (!nutritionProgramReview) {
      throw new NotFoundException(
        `Nutrition program review with ID ${id} not found`,
      );
    }
    return nutritionProgramReview;
  }

  async update(
    id: number,
    updateNutritionProgramReviewDto: UpdateNutritionProgramReviewDto,
    userId: number,
  ): Promise<NutritionProgramReview> {
    const nutritionProgramReview =
      await this.nutritionProgramReviewsRepository.preload({
        id,
        ...updateNutritionProgramReviewDto,
      });
    if (!nutritionProgramReview) {
      throw new NotFoundException(
        `Nutrition program review with ID ${id} not found`,
      );
    }
    // Vérifier que l'utilisateur est autorisé à modifier son évaluation
    if (nutritionProgramReview.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this nutrition program review",
      );
    }
    return this.nutritionProgramReviewsRepository.save(nutritionProgramReview);
  }

  async remove(id: number, userId: number): Promise<void> {
    const nutritionProgramReview =
      await this.nutritionProgramReviewsRepository.findOne({
        where: { id },
      });
    if (!nutritionProgramReview) {
      throw new NotFoundException(
        `Nutrition program review with ID ${id} not found`,
      );
    }
    // Vérifier que l'utilisateur est autorisé à supprimer son évaluation
    if (nutritionProgramReview.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this nutrition program review",
      );
    }
    await this.nutritionProgramReviewsRepository.delete(id);
  }

  async searchNutritionProgramReviews(
    query: string,
  ): Promise<NutritionProgramReview[]> {
    const nutritionProgramReviews =
      await this.nutritionProgramReviewsRepository.find({
        where: [
          { user: { firstName: `%${query}%` } },
          { user: { lastName: `%${query}%` } },
          { user: { email: `%${query}%` } },
          { nutritionProgram: { title: `%${query}%` } },
          { nutritionProgram: { description: `%${query}%` } },
          { reviewText: `%${query}%` },
        ],
        relations: ["user", "nutritionProgram"],
      });
    return nutritionProgramReviews;
  }

  async findByUser(userId: number): Promise<NutritionProgramReview[]> {
    const nutritionProgramReviews =
      await this.nutritionProgramReviewsRepository.find({
        where: { user: { id: userId } },
        relations: ["user", "nutritionProgram"],
      });
    if (!nutritionProgramReviews) {
      throw new NotFoundException(
        `Nutrition program reviews for user ${userId} not found`,
      );
    }
    return nutritionProgramReviews;
  }

  async findByProgram(programId: number): Promise<NutritionProgramReview[]> {
    const nutritionProgramReviews =
      await this.nutritionProgramReviewsRepository.find({
        where: { nutritionProgram: { id: programId } },
        relations: ["user", "nutritionProgram"],
      });
    if (!nutritionProgramReviews) {
      throw new NotFoundException(
        `Nutrition program reviews for program ${programId} not found`,
      );
    }
    return nutritionProgramReviews;
  }
}
