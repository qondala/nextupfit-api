import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserNutritionProgress } from "../../entities/user-nutrition-progress.entity";
import { Repository } from "typeorm";
import { CreateUserNutritionProgressDto } from "./dto/create-usernutritionprogram.dto";
import { UpdateUserNutritionProgressDto } from "./dto/update-usernutritionprogram";

@Injectable()
export class UserNutritionProgressService {
  constructor(
    @InjectRepository(UserNutritionProgress)
    private userNutritionProgressRepository: Repository<UserNutritionProgress>,
  ) {}

  async create(
    createUserNutritionProgressDto: CreateUserNutritionProgressDto,
    userId: number,
  ): Promise<UserNutritionProgress> {
    const userNutritionProgress = this.userNutritionProgressRepository.create({
      ...createUserNutritionProgressDto,
      user: { id: userId },
      nutritionProgram: {
        id: createUserNutritionProgressDto.nutritionProgramId,
      },
    });
    return this.userNutritionProgressRepository.save(userNutritionProgress);
  }

  async findAll(): Promise<UserNutritionProgress[]> {
    return this.userNutritionProgressRepository.find({
      relations: ["user", "nutritionProgram"],
    });
  }

  async findOne(id: number): Promise<UserNutritionProgress> {
    const userNutritionProgress =
      await this.userNutritionProgressRepository.findOne({
        where: { id },
        relations: ["user", "nutritionProgram"],
      });
    if (!userNutritionProgress) {
      throw new NotFoundException(
        `User nutrition progress with ID ${id} not found`,
      );
    }
    return userNutritionProgress;
  }

  async update(
    id: number,
    updateUserNutritionProgressDto: UpdateUserNutritionProgressDto,
    userId: number,
  ): Promise<UserNutritionProgress> {
    const userNutritionProgress =
      await this.userNutritionProgressRepository.preload({
        id,
        ...updateUserNutritionProgressDto,
      });
    if (!userNutritionProgress) {
      throw new NotFoundException(
        `User nutrition progress with ID ${id} not found`,
      );
    }
    const user = (
      await this.userNutritionProgressRepository.findOne({
        where: { id },
        relations: ["user"],
      })
    ).user;
    // Vérifier que l'utilisateur est autorisé à modifier sa progression nutritionnelle
    if (user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this user nutrition progress",
      );
    }
    return this.userNutritionProgressRepository.save(userNutritionProgress);
  }

  async remove(id: number, userId: number): Promise<void> {
    const userNutritionProgress =
      await this.userNutritionProgressRepository.findOne({
        where: { id },
      });
    if (!userNutritionProgress) {
      throw new NotFoundException(
        `User nutrition progress with ID ${id} not found`,
      );
    }
    // Vérifier que l'utilisateur est autorisé à supprimer sa progression nutritionnelle
    if (userNutritionProgress.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this user nutrition progress",
      );
    }
    await this.userNutritionProgressRepository.delete(id);
  }

  async searchUserNutritionProgress(
    query: string,
  ): Promise<UserNutritionProgress[]> {
    const userNutritionProgress =
      await this.userNutritionProgressRepository.find({
        where: [
          { user: { firstName: `%${query}%` } },
          { user: { lastName: `%${query}%` } },
          { user: { email: `%${query}%` } },
          { nutritionProgram: { title: `%${query}%` } },
          { nutritionProgram: { description: `%${query}%` } },
        ],
        relations: ["user", "nutritionProgram"],
      });
    return userNutritionProgress;
  }

  async findByUser(userId: number): Promise<UserNutritionProgress[]> {
    const userNutritionProgress =
      await this.userNutritionProgressRepository.find({
        where: { user: { id: userId } },
        relations: ["user", "nutritionProgram"],
      });
    if (!userNutritionProgress) {
      throw new NotFoundException(
        `User nutrition progress for user ${userId} not found`,
      );
    }
    return userNutritionProgress;
  }

  async findByProgram(programId: number): Promise<UserNutritionProgress[]> {
    const userNutritionProgress =
      await this.userNutritionProgressRepository.find({
        where: { nutritionProgram: { id: programId } },
        relations: ["user", "nutritionProgram"],
      });
    if (!userNutritionProgress) {
      throw new NotFoundException(
        `User nutrition progress for program ${programId} not found`,
      );
    }
    return userNutritionProgress;
  }
}
