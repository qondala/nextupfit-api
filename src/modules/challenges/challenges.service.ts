import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import { UpdateChallengeDto } from "./dto/update-challenge.dto";
import { Challenge } from "../../entities/challenge.entity";

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private challengesRepository: Repository<Challenge>,
  ) {}

  async create(
    createChallengeDto: CreateChallengeDto,
    coachId: number,
  ): Promise<Challenge> {
    const challenge = this.challengesRepository.create({
      ...createChallengeDto,
      content: { id: createChallengeDto.contentId },
    });
    return this.challengesRepository.save(challenge);
  }

  async findAll(): Promise<Challenge[]> {
    return this.challengesRepository.find({
      relations: ["content"],
    });
  }

  async findOne(id: number): Promise<Challenge> {
    const challenge = await this.challengesRepository.findOne({
      where: { id },
      relations: ["content"],
    });
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    return challenge;
  }

  async update(
    id: number,
    updateChallengeDto: UpdateChallengeDto,
    coachId: number,
  ): Promise<Challenge> {
    const challenge = await this.challengesRepository.preload({
      id,
      ...updateChallengeDto,
    });
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à modifier le challenge
    if (challenge.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this challenge",
      );
    }
    return this.challengesRepository.save(challenge);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const challenge = await this.challengesRepository.findOne({
      where: { id },
    });
    if (!challenge) {
      throw new NotFoundException(`Challenge with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à supprimer le challenge
    if (challenge.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this challenge",
      );
    }
    await this.challengesRepository.delete(id);
  }

  async searchChallenges(query: string): Promise<Challenge[]> {
    const challenges = await this.challengesRepository.find({
      where: [
        { content: { title: `%${query}%` } },
        { content: { description: `%${query}%` } },
        { challengeDescription: `%${query}%` },
      ],
      relations: ["content"],
    });
    return challenges;
  }

  async findByContent(contentId: number): Promise<Challenge[]> {
    const challenges = await this.challengesRepository.find({
      where: { content: { id: contentId } },
      relations: ["content"],
    });
    if (!challenges) {
      throw new NotFoundException(
        `Challenges for content ${contentId} not found`,
      );
    }
    return challenges;
  }
}
