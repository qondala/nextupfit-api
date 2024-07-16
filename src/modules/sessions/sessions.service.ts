import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSessionDto } from "./dto/create-session.dto";
import { UpdateSessionDto } from "./dto/update-session.dto";
import { Session } from "../../entities/session.entity";

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  async create(
    createSessionDto: CreateSessionDto,
    coachId: number,
  ): Promise<Session> {
    const session = this.sessionsRepository.create({
      ...createSessionDto,
      content: { id: createSessionDto.contentId },
    });
    return this.sessionsRepository.save(session);
  }

  async findAll(): Promise<Session[]> {
    return this.sessionsRepository.find({
      relations: ["content", "trainingContentLinks", "trainingSessions"],
    });
  }

  async findOne(id: number): Promise<Session> {
    const session = await this.sessionsRepository.findOne({
      where: { id },
      relations: ["content", "trainingContentLinks", "trainingSessions"],
    });
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return session;
  }

  async update(
    id: number,
    updateSessionDto: UpdateSessionDto,
    coachId: number,
  ): Promise<Session> {
    const session = await this.sessionsRepository.preload({
      id,
      ...updateSessionDto,
    });
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à modifier la session
    if (session.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this session",
      );
    }
    return this.sessionsRepository.save(session);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const session = await this.sessionsRepository.findOne({
      where: { id },
    });
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à supprimer la session
    if (session.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this session",
      );
    }
    await this.sessionsRepository.delete(id);
  }

  async searchSessions(query: string): Promise<Session[]> {
    const sessions = await this.sessionsRepository.find({
      where: [
        { content: { title: `%${query}%` } },
        { content: { description: `%${query}%` } },
        { location: `%${query}%` },
      ],
      relations: ["content", "trainingContentLinks", "trainingSessions"],
    });
    return sessions;
  }

  async findByContent(contentId: number): Promise<Session[]> {
    const sessions = await this.sessionsRepository.find({
      where: { content: { id: contentId } },
      relations: ["content", "trainingContentLinks", "trainingSessions"],
    });
    if (!sessions) {
      throw new NotFoundException(
        `Sessions for content ${contentId} not found`,
      );
    }
    return sessions;
  }
}
