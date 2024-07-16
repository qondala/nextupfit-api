import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTrainingSessionDto } from "./dto/create-trainingsession.dto";
import { UpdateTrainingSessionDto } from "./dto/update-trainingsession.dto";
import { TrainingSession } from "../../entities/training-session.entity";

@Injectable()
export class TrainingSessionsService {
  constructor(
    @InjectRepository(TrainingSession)
    private trainingSessionsRepository: Repository<TrainingSession>,
  ) {}

  async create(
    createTrainingSessionDto: CreateTrainingSessionDto,
    userId: number,
  ): Promise<TrainingSession> {
    const trainingSession = this.trainingSessionsRepository.create({
      ...createTrainingSessionDto,
      user: { id: userId },
      session: { id: createTrainingSessionDto.sessionId },
    });
    return this.trainingSessionsRepository.save(trainingSession);
  }

  async findAll(): Promise<TrainingSession[]> {
    return this.trainingSessionsRepository.find({
      relations: ["user", "session"],
    });
  }

  async findOne(id: number): Promise<TrainingSession> {
    const trainingSession = await this.trainingSessionsRepository.findOne({
      where: { id },
      relations: ["user", "session"],
    });
    if (!trainingSession) {
      throw new NotFoundException(`Training session with ID ${id} not found`);
    }
    return trainingSession;
  }

  async update(
    id: number,
    updateTrainingSessionDto: UpdateTrainingSessionDto,
    userId: number,
  ): Promise<TrainingSession> {
    const trainingSession = await this.trainingSessionsRepository.preload({
      id,
      ...updateTrainingSessionDto,
    });
    if (!trainingSession) {
      throw new NotFoundException(`Training session with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier la session d'entraînement
    if (trainingSession.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this training session",
      );
    }
    return this.trainingSessionsRepository.save(trainingSession);
  }

  async remove(id: number, userId: number): Promise<void> {
    const trainingSession = await this.trainingSessionsRepository.findOne({
      where: { id },
    });
    if (!trainingSession) {
      throw new NotFoundException(`Training session with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer la session d'entraînement
    if (trainingSession.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this training session",
      );
    }
    await this.trainingSessionsRepository.delete(id);
  }

  async searchTrainingSessions(query: string): Promise<TrainingSession[]> {
    const trainingSessions = await this.trainingSessionsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { session: { content: { title: `%${query}%` } } },
        { session: { content: { description: `%${query}%` } } },
      ],
      relations: ["user", "session"],
    });
    return trainingSessions;
  }

  async findByUser(userId: number): Promise<TrainingSession[]> {
    const trainingSessions = await this.trainingSessionsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "session"],
    });
    if (!trainingSessions) {
      throw new NotFoundException(
        `Training sessions for user ${userId} not found`,
      );
    }
    return trainingSessions;
  }

  async findBySession(sessionId: number): Promise<TrainingSession[]> {
    const trainingSessions = await this.trainingSessionsRepository.find({
      where: { session: { id: sessionId } },
      relations: ["user", "session"],
    });
    if (!trainingSessions) {
      throw new NotFoundException(
        `Training sessions for session ${sessionId} not found`,
      );
    }
    return trainingSessions;
  }
}
