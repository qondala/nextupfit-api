import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserNutritionDto } from "./dto/create-usernutrition.dto";
import { UpdateUserNutritionDto } from "./dto/update-usernutrition.dto";
import { UserNutrition } from "../../entities/user-nutrition.entity";

@Injectable()
export class UserNutritionService {
  constructor(
    @InjectRepository(UserNutrition)
    private userNutritionRepository: Repository<UserNutrition>,
  ) {}

  async create(
    createUserNutritionDto: CreateUserNutritionDto,
    userId: number,
  ): Promise<UserNutrition> {
    const userNutrition = this.userNutritionRepository.create({
      ...createUserNutritionDto,
      user: { id: userId },
      nutritionProgram: { id: createUserNutritionDto.nutritionProgramId },
    });
    return this.userNutritionRepository.save(userNutrition);
  }

  async findAll(): Promise<UserNutrition[]> {
    return this.userNutritionRepository.find({
      relations: ["user", "nutritionProgram"],
    });
  }

  async findOne(id: number): Promise<UserNutrition> {
    const userNutrition = await this.userNutritionRepository.findOne({
      where: { id },
      relations: [
        "user",
        "nutritionProgram",
        "nutritionProgram.nutritionDetails",
      ],
    });
    if (!userNutrition) {
      throw new NotFoundException(`User nutrition with ID ${id} not found`);
    }
    return userNutrition;
  }

  async update(
    id: number,
    updateUserNutritionDto: UpdateUserNutritionDto,
    userId: number,
  ): Promise<UserNutrition> {
    const userNutrition = await this.userNutritionRepository.preload({
      id,
      ...updateUserNutritionDto,
    });
    if (!userNutrition) {
      throw new NotFoundException(`User nutrition with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier son engagement nutritionnel
    if (userNutrition.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this user nutrition",
      );
    }
    return this.userNutritionRepository.save(userNutrition);
  }

  async remove(id: number, userId: number): Promise<void> {
    const userNutrition = await this.userNutritionRepository.findOne({
      where: { id },
    });
    if (!userNutrition) {
      throw new NotFoundException(`User nutrition with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer son engagement nutritionnel
    if (userNutrition.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this user nutrition",
      );
    }
    await this.userNutritionRepository.delete(id);
  }

  async searchUserNutrition(query: string): Promise<UserNutrition[]> {
    const userNutrition = await this.userNutritionRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { nutritionProgram: { title: `%${query}%` } },
        { nutritionProgram: { description: `%${query}%` } },
      ],
      relations: ["user", "nutritionProgram"],
    });
    return userNutrition;
  }

  async findByUser(userId: number): Promise<UserNutrition[]> {
    const userNutrition = await this.userNutritionRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "nutritionProgram"],
    });
    if (!userNutrition) {
      throw new NotFoundException(
        `User nutrition for user ${userId} not found`,
      );
    }
    return userNutrition;
  }

  async findByProgram(programId: number): Promise<UserNutrition[]> {
    const userNutrition = await this.userNutritionRepository.find({
      where: { nutritionProgram: { id: programId } },
      relations: ["user", "nutritionProgram"],
    });
    if (!userNutrition) {
      throw new NotFoundException(
        `User nutrition for program ${programId} not found`,
      );
    }
    return userNutrition;
  }
}
