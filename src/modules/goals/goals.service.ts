import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";
import { FitnessGoal } from "../../entities/fitness-goal.entity";

@Injectable()
export class GoalsService {
  constructor(
    @InjectRepository(FitnessGoal)
    private goalsRepository: Repository<FitnessGoal>,
  ) {}

  async create(
    createGoalDto: CreateGoalDto,
    userId: number,
  ): Promise<FitnessGoal> {
    const goal = this.goalsRepository.create({
      ...createGoalDto,
      user: { id: userId },
    });
    return this.goalsRepository.save(goal);
  }

  async findAll(): Promise<FitnessGoal[]> {
    return this.goalsRepository.find({
      relations: ["user", "contentGoals", "exerciseGoals"],
    });
  }

  async findOne(id: number): Promise<FitnessGoal> {
    const goal = await this.goalsRepository.findOne({
      where: { id },
      relations: ["user", "contentGoals", "exerciseGoals"],
    });
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }
    return goal;
  }

  async update(
    id: number,
    updateGoalDto: UpdateGoalDto,
    userId: number,
  ): Promise<FitnessGoal> {
    const goal = await this.goalsRepository.preload({
      id,
      ...updateGoalDto,
    });
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier l'objectif
    if (goal.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this goal",
      );
    }
    return this.goalsRepository.save(goal);
  }

  async remove(id: number, userId: number): Promise<void> {
    const goal = await this.goalsRepository.findOne({
      where: { id },
    });
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer l'objectif
    if (goal.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this goal",
      );
    }
    await this.goalsRepository.delete(id);
  }

  async searchGoals(query: string): Promise<FitnessGoal[]> {
    const goals = await this.goalsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { goalDescription: `%${query}%` },
      ],
      relations: ["user", "contentGoals", "exerciseGoals"],
    });
    return goals;
  }

  async findByUser(userId: number): Promise<FitnessGoal[]> {
    const goals = await this.goalsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "contentGoals", "exerciseGoals"],
    });
    if (!goals) {
      throw new NotFoundException(`Goals for user ${userId} not found`);
    }
    return goals;
  }
}
