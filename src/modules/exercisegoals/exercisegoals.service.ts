import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExerciseGoal } from "../../entities/exercise-goal.entity";
import { Repository } from "typeorm";
import { CreateExerciseGoalDto } from "./dto/create-exercisegoal.dto";
import { UpdateExerciseGoalDto } from "./dto/update-exercisegoal.dto";

@Injectable()
export class ExerciseGoalsService {
  constructor(
    @InjectRepository(ExerciseGoal)
    private exerciseGoalsRepository: Repository<ExerciseGoal>,
  ) {}

  async create(
    createExerciseGoalDto: CreateExerciseGoalDto,
    coachId: number,
  ): Promise<ExerciseGoal> {
    const exerciseGoal = this.exerciseGoalsRepository.create({
      ...createExerciseGoalDto,
      exercise: { id: createExerciseGoalDto.exerciseId },
      goal: { id: createExerciseGoalDto.goalId },
    });
    return this.exerciseGoalsRepository.save(exerciseGoal);
  }

  async findAll(): Promise<ExerciseGoal[]> {
    return this.exerciseGoalsRepository.find({
      relations: ["exercise", "goal"],
    });
  }

  async findOne(id: number): Promise<ExerciseGoal> {
    const exerciseGoal = await this.exerciseGoalsRepository.findOne({
      where: { id },
      relations: ["exercise", "goal"],
    });
    if (!exerciseGoal) {
      throw new NotFoundException(`Exercise goal with ID ${id} not found`);
    }
    return exerciseGoal;
  }

  async update(
    id: number,
    updateExerciseGoalDto: UpdateExerciseGoalDto,
    coachId: number,
  ): Promise<ExerciseGoal> {
    const exerciseGoal = await this.exerciseGoalsRepository.preload({
      id,
      ...updateExerciseGoalDto,
    });
    if (!exerciseGoal) {
      throw new NotFoundException(`Exercise goal with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à modifier l'association
    if (exerciseGoal.exercise.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this exercise goal",
      );
    }
    return this.exerciseGoalsRepository.save(exerciseGoal);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const exerciseGoal = await this.exerciseGoalsRepository.findOne({
      where: { id },
    });
    if (!exerciseGoal) {
      throw new NotFoundException(`Exercise goal with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à supprimer l'association
    if (exerciseGoal.exercise.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this exercise goal",
      );
    }
    await this.exerciseGoalsRepository.delete(id);
  }

  async searchExerciseGoals(query: string): Promise<ExerciseGoal[]> {
    const exerciseGoals = await this.exerciseGoalsRepository.find({
      where: [
        { exercise: { title: `%${query}%` } },
        { exercise: { description: `%${query}%` } },
        { goal: { goalDescription: `%${query}%` } },
      ],
      relations: ["exercise", "goal"],
    });
    return exerciseGoals;
  }

  async findByExercise(exerciseId: number): Promise<ExerciseGoal[]> {
    const exerciseGoals = await this.exerciseGoalsRepository.find({
      where: { exercise: { id: exerciseId } },
      relations: ["exercise", "goal"],
    });
    if (!exerciseGoals) {
      throw new NotFoundException(
        `Exercise goals for exercise ${exerciseId} not found`,
      );
    }
    return exerciseGoals;
  }

  async findByGoal(goalId: number): Promise<ExerciseGoal[]> {
    const exerciseGoals = await this.exerciseGoalsRepository.find({
      where: { goal: { id: goalId } },
      relations: ["exercise", "goal"],
    });
    if (!exerciseGoals) {
      throw new NotFoundException(
        `Exercise goals for goal ${goalId} not found`,
      );
    }
    return exerciseGoals;
  }
}
