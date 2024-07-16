import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProgressDto } from "./dto/create-progress.dto";
import { UpdateProgressDto } from "./dto/update-progress.dto";
import { Progress } from "../../entities/progress.entity";

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) {}

  async create(
    createProgressDto: CreateProgressDto,
    userId: number,
  ): Promise<Progress> {
    const progress = this.progressRepository.create({
      ...createProgressDto,
      user: { id: userId },
      exercise: { id: createProgressDto.exerciseId },
    });
    return this.progressRepository.save(progress);
  }

  async findAll(): Promise<Progress[]> {
    return this.progressRepository.find({
      relations: ["user", "exercise"],
    });
  }

  async findOne(id: number): Promise<Progress> {
    const progress = await this.progressRepository.findOne({
      where: { id },
      relations: ["user", "exercise"],
    });
    if (!progress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    return progress;
  }

  async update(
    id: number,
    updateProgressDto: UpdateProgressDto,
    userId: number,
  ): Promise<Progress> {
    const progress = await this.progressRepository.preload({
      id,
      ...updateProgressDto,
    });
    if (!progress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier sa progression
    if (progress.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this progress",
      );
    }
    return this.progressRepository.save(progress);
  }

  async remove(id: number, userId: number): Promise<void> {
    const progress = await this.progressRepository.findOne({
      where: { id },
    });
    if (!progress) {
      throw new NotFoundException(`Progress with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer sa progression
    if (progress.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this progress",
      );
    }
    await this.progressRepository.delete(id);
  }

  async searchProgress(query: string): Promise<Progress[]> {
    const progress = await this.progressRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { exercise: { title: `%${query}%` } },
        { exercise: { description: `%${query}%` } },
      ],
      relations: ["user", "exercise"],
    });
    return progress;
  }

  async findByUser(userId: number): Promise<Progress[]> {
    const progress = await this.progressRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "exercise"],
    });
    if (!progress) {
      throw new NotFoundException(`Progress for user ${userId} not found`);
    }
    return progress;
  }

  async findByExercise(exerciseId: number): Promise<Progress[]> {
    const progress = await this.progressRepository.find({
      where: { exercise: { id: exerciseId } },
      relations: ["user", "exercise"],
    });
    if (!progress) {
      throw new NotFoundException(
        `Progress for exercise ${exerciseId} not found`,
      );
    }
    return progress;
  }
}
