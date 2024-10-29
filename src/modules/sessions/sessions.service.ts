import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
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
    userId: number,
  ): Promise<Session> {
    const content = { id: createSessionDto.contentId };
    const coach = { user: { id: userId } };
    const session = this.sessionsRepository.create({
      ...createSessionDto,
      content,
      coach,
    });
    return this.sessionsRepository.save(session);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginationResult<Session>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await this.sessionsRepository.findAndCount({
      skip,
      take: pageSize,
    });
    return { items, total };
  }

  async findOne(id: number): Promise<Session> {
    const session = await this.buildSessionFindOneQuery(id).getOne();
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return session;
  }

  private buildSessionFindOneQuery(id: number): SelectQueryBuilder<Session> {
    const qb = this.sessionsRepository.createQueryBuilder("session");
    this.addRelations(qb);
    return qb.where("session.id = :id", { id });
  }

  async update(
    id: number,
    updateSessionDto: UpdateSessionDto,
    coachId: number,
  ): Promise<Session> {
    const session = await this.sessionsRepository.findOne({
      where: { id },
      relations: ["content", "content.coach"], // Charger les relations nécessaires pour la vérification
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }

    if (session.content.coach.id !== coachId) {
      // Accéder à coachId via les relations
      throw new UnauthorizedException(
        "You are not authorized to update this session",
      );
    }

    Object.assign(session, updateSessionDto); // Mettre à jour les propriétés de la session

    return this.sessionsRepository.save(session);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const session = await this.sessionsRepository.findOne({
      where: { id },
      relations: ["content", "content.coach"], // Charger les relations nécessaires
    });

    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }

    if (session.content.coach.id !== coachId) {
      // Accéder à coachId via les relations
      throw new UnauthorizedException(
        "You are not authorized to delete this session",
      );
    }

    await this.sessionsRepository.delete(id);
  }

  async searchSessions(query: string): Promise<Session[]> {
    const qb = this.sessionsRepository.createQueryBuilder("session");
    this.addRelations(qb);

    qb.leftJoinAndSelect("session.content", "contents")
      .where("contents.title LIKE :query", { query: `%${query}%` })
      .orWhere("contents.description LIKE :query", { query: `%${query}%` })
      .orWhere("session.location LIKE :query", { query: `%${query}%` });

    return qb.getMany();
  }

  async findByContent(contentId: number): Promise<Session[]> {
    const qb = this.sessionsRepository.createQueryBuilder("session");
    this.addRelations(qb);
    qb.where("session.content.id = :contentId", { contentId });

    const sessions = await qb.getMany();
    if (!sessions.length) {
      throw new NotFoundException(
        `Sessions for content ${contentId} not found`,
      );
    }

    return sessions;
  }

  async findByCategory(categoryId: number): Promise<Session[]> {
    const qb = this.sessionsRepository.createQueryBuilder("session");
    this.addRelations(qb);
    qb.where("session.content.category.id = :categoryId", { categoryId });

    const sessions = await qb.getMany();
    if (!sessions.length) {
      throw new NotFoundException(
        `Sessions for Category ${categoryId} not found`,
      );
    }

    return sessions;
  }

  private addRelations(qb: SelectQueryBuilder<Session>) {
    qb.leftJoinAndSelect("session.content", "content")
      .leftJoinAndSelect("content.category", "category")
      .leftJoinAndSelect("session.coach", "coach")
      .leftJoinAndSelect("coach.user", "user")
      .leftJoinAndSelect("session.trainingContentLinks", "trainingContentLinks")
      .leftJoinAndSelect("session.trainingSessions", "trainingSessions");
  }
}
