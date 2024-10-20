import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, SelectQueryBuilder } from "typeorm";
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import { UpdateChallengeDto } from "./dto/update-challenge.dto";
import { Challenge } from "../../entities/challenge.entity";
import { Session } from "src/entities/session.entity";

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
    @InjectRepository(Session) // Injectez le repository Session
    private sessionRepository: Repository<Session>,
  ) {}

  async create(
    createChallengeDto: CreateChallengeDto,
    userId: number,
  ): Promise<Challenge> {
    const challenge = this.challengesRepository.create({
      ...createChallengeDto,
      content: { id: createChallengeDto.contentId },
      coach: { user: { id: userId } },
    });
    return this.challengesRepository.save(challenge);
  }

  async findAll(page = 1, pageSize = 10): Promise<PaginationResult<Challenge>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await this.challengesRepository.findAndCount({
      where: { content: { status: "approved" } },
      skip: skip,
      take: pageSize,
      relations: ["coach"],
    });

    return { items, total };
  }

  async findOne(id: number): Promise<Challenge> {
    const challenge = await this.buildChallengeFindOneQuery(id)
      .leftJoinAndSelect("sessions.coach", "sessions.coach")
      .leftJoinAndSelect("sessions.content", "contents")
      .leftJoinAndSelect("contents.reviews", "reviews")
      .getOne();
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    return challenge;
  }

  private buildChallengeFindOneQuery(
    id: number,
  ): SelectQueryBuilder<Challenge> {
    const qb = this.challengesRepository.createQueryBuilder("challenge");
    this.addRelations(qb);
    return qb.where("challenge.id = :id", { id });
  }

  async update(
    id: number,
    updateChallengeDto: UpdateChallengeDto,
    coachId: number,
  ): Promise<Challenge> {
    const challenge = await this.challengesRepository.findOne({
      where: { id },
      relations: ["content", "content.coach"],
    });
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    if (challenge.content.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this challenge",
      );
    }
    Object.assign(challenge, updateChallengeDto);
    return this.challengesRepository.save(challenge);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const challenge = await this.challengesRepository.findOne({
      where: { id },
      relations: ["content", "content.coach"], // Charger les relations pour la vérification
    });
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    if (challenge.content.coach.id !== coachId) {
      // Vérifier l'autorisation via la relation
      throw new UnauthorizedException(
        "You are not authorized to delete this challenge",
      );
    }
    await this.challengesRepository.delete(id);
  }

  async searchChallenges(query: string): Promise<Challenge[]> {
    const qb = this.challengesRepository.createQueryBuilder("challenge");
    this.addRelations(qb);

    qb.leftJoinAndSelect("challenge.content", "contents")
      .leftJoinAndSelect("challenge.coach", "coaches")
      .where("contents.title LIKE :query", { query: `%${query}%` })
      .orWhere("contents.description LIKE :query", { query: `%${query}%` })
      .orWhere("challenge.challengeDescription LIKE :query", {
        query: `%${query}%`,
      });

    return qb.getMany();
  }

  async findByContent(contentId: number): Promise<Challenge[]> {
    const qb = this.challengesRepository.createQueryBuilder("challenge");
    this.addRelations(qb);

    qb.where("challenge.content.id = :contentId", { contentId });
    const challenges = await qb.getMany();

    if (!challenges.length) {
      throw new NotFoundException(
        `Challenges for content ${contentId} not found`,
      );
    }

    return challenges;
  }

  async findByCategory(categoryId: number): Promise<Challenge[]> {
    const qb = this.challengesRepository.createQueryBuilder("challenge");
    this.addRelations(qb);

    qb.leftJoinAndSelect("challenge.content", "content") // Jointure explicite pour accéder à categoryId
      .where("content.categoryId = :categoryId", { categoryId });

    const challenges = await qb.getMany();
    if (!challenges.length) {
      throw new NotFoundException(
        `Challenges for category ${categoryId} not found`,
      );
    }
    return challenges;
  }

  private addRelations(qb: SelectQueryBuilder<Challenge>) {
    qb.leftJoinAndSelect("challenge.content", "content")
      .leftJoinAndSelect("challenge.coach", "coach")
      .leftJoinAndSelect("content.category", "category")
      .leftJoinAndSelect("challenge.sessions", "sessions"); // Assurez-vous que la relation "sessions" existe dans l'entité Challenge
  }

  async addSessionToChallenge(
    challengeId: number,
    sessionId: number,
  ): Promise<Session> {
    const challenge = await this.challengesRepository.findOne({
      where: { id: challengeId },
    });
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
    });

    if (!challenge || !session) {
      throw new NotFoundException("Challenge or session not found");
    }

    session.challenge = challenge; // Associez la session au challenge
    return this.sessionRepository.save(session); // Enregistrez la session mise à jour
  }
}
