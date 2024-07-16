import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateExerciseNutritionDto } from "./dto/create-exercisenutrition.dto";
import { UpdateExerciseNutritionDto } from "./dto/update-exercisenutrition.dto";
import { ExerciseNutrition } from "../../entities/exercise-nutrition.entity";

@Injectable()
export class ExerciseNutritionService {
  constructor(
    @InjectRepository(ExerciseNutrition)
    private exerciseNutritionRepository: Repository<ExerciseNutrition>,
  ) {}

  async create(
    createExerciseNutritionDto: CreateExerciseNutritionDto,
    coachId: number,
  ): Promise<ExerciseNutrition> {
    const exerciseNutrition = this.exerciseNutritionRepository.create({
      ...createExerciseNutritionDto,
      exercise: { id: createExerciseNutritionDto.exerciseId },
      nutritionProgram: { id: createExerciseNutritionDto.nutritionProgramId },
    });
    return this.exerciseNutritionRepository.save(exerciseNutrition);
  }

  async findAll(): Promise<ExerciseNutrition[]> {
    return this.exerciseNutritionRepository.find({
      relations: ["exercise", "nutritionProgram"],
    });
  }

  async findOne(id: number): Promise<ExerciseNutrition> {
    const exerciseNutrition = await this.exerciseNutritionRepository.findOne({
      where: { id },
      relations: ["exercise", "nutritionProgram"],
    });
    if (!exerciseNutrition) {
      throw new NotFoundException(`Exercise nutrition with ID ${id} not found`);
    }
    return exerciseNutrition;
  }

  async update(
    id: number,
    updateExerciseNutritionDto: UpdateExerciseNutritionDto,
    coachId: number,
  ): Promise<ExerciseNutrition> {
    const exerciseNutrition = await this.exerciseNutritionRepository.preload({
      id,
      ...updateExerciseNutritionDto,
    });
    if (!exerciseNutrition) {
      throw new NotFoundException(`Exercise nutrition with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à modifier l'association
    if (exerciseNutrition.exercise.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this exercise nutrition",
      );
    }
    return this.exerciseNutritionRepository.save(exerciseNutrition);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const exerciseNutrition = await this.exerciseNutritionRepository.findOne({
      where: { id },
    });
    if (!exerciseNutrition) {
      throw new NotFoundException(`Exercise nutrition with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à supprimer l'association
    if (exerciseNutrition.exercise.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this exercise nutrition",
      );
    }
    await this.exerciseNutritionRepository.delete(id);
  }

  async searchExerciseNutrition(query: string): Promise<ExerciseNutrition[]> {
    const exerciseNutrition = await this.exerciseNutritionRepository.find({
      where: [
        { exercise: { title: `%${query}%` } },
        { exercise: { description: `%${query}%` } },
        { nutritionProgram: { title: `%${query}%` } },
        { nutritionProgram: { description: `%${query}%` } },
      ],
      relations: ["exercise", "nutritionProgram"],
    });
    return exerciseNutrition;
  }

  async findByExercise(exerciseId: number): Promise<ExerciseNutrition[]> {
    const exerciseNutrition = await this.exerciseNutritionRepository.find({
      where: { exercise: { id: exerciseId } },
      relations: ["exercise", "nutritionProgram"],
    });
    if (!exerciseNutrition) {
      throw new NotFoundException(
        `Exercise nutrition for exercise ${exerciseId} not found`,
      );
    }
    return exerciseNutrition;
  }

  async findByProgram(programId: number): Promise<ExerciseNutrition[]> {
    const exerciseNutrition = await this.exerciseNutritionRepository.find({
      where: { nutritionProgram: { id: programId } },
      relations: ["exercise", "nutritionProgram"],
    });
    if (!exerciseNutrition) {
      throw new NotFoundException(
        `Exercise nutrition for program ${programId} not found`,
      );
    }
    return exerciseNutrition;
  }
}
