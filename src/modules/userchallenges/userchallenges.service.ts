import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserChallenge } from "../../entities/user-challenge.entity";
import { Repository } from "typeorm";
import { CreateUserChallengeDto } from "./dto/create-userchallenge.dto";
import { UpdateUserChallengeDto } from "./dto/update-userchallenge.dto";

@Injectable()
export class UserChallengesService {
  constructor(
    @InjectRepository(UserChallenge)
    private userChallengesRepository: Repository<UserChallenge>,
  ) {}

  async create(
    createUserChallengeDto: CreateUserChallengeDto,
    userId: number,
  ): Promise<UserChallenge> {
    const userChallenge = this.userChallengesRepository.create({
      ...createUserChallengeDto,
      user: { id: userId },
      challenge: { id: createUserChallengeDto.challengeId },
    });
    return this.userChallengesRepository.save(userChallenge);
  }

  async findAll(): Promise<UserChallenge[]> {
    return this.userChallengesRepository.find({
      relations: ["user", "content", "performanceRecords"],
    });
  }

  async findOne(id: number): Promise<UserChallenge> {
    const userChallenge = await this.userChallengesRepository.findOne({
      where: { id },
      relations: ["user", "content", "performanceRecords"],
    });
    if (!userChallenge) {
      throw new NotFoundException(`User program with ID ${id} not found`);
    }
    return userChallenge;
  }

  async update(
    id: number,
    updateUserChallengeDto: UpdateUserChallengeDto,
    userId: number,
  ): Promise<UserChallenge> {
    const userChallenge = await this.userChallengesRepository.preload({
      id,
      user: { id: updateUserChallengeDto.userId },
      challenge: { id: updateUserChallengeDto.challengeId },
      startDate: new Date(),
    });
    if (!userChallenge) {
      throw new NotFoundException(`User program with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier le programme
    if (userChallenge.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this user program",
      );
    }
    return this.userChallengesRepository.save(userChallenge);
  }

  async remove(id: number, userId: number): Promise<void> {
    const userChallenge = await this.userChallengesRepository.findOne({
      where: { id },
    });
    if (!userChallenge) {
      throw new NotFoundException(`User program with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer le programme
    if (userChallenge.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this user program",
      );
    }
    await this.userChallengesRepository.delete(id);
  }

  async searchUserChallenges(query: string): Promise<UserChallenge[]> {
    const userChallenges = await this.userChallengesRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { challenge: { challengeDescription: `%${query}%` } },
      ],
      relations: ["user", "challenge"],
    });
    return userChallenges;
  }

  async findByUser(userId: number): Promise<UserChallenge[]> {
    const userChallenges = await this.userChallengesRepository.find({
      where: { user: { id: userId } },
      relations: [
        "user",
        "challenge",
        "challenge.sessions",
        "challenge.sessions.coach",
      ],
    });
    if (!userChallenges) {
      throw new NotFoundException(`User programs for user ${userId} not found`);
    }
    return userChallenges;
  }

  async findByChallenge(challengeId: number): Promise<UserChallenge[]> {
    const userChallenges = await this.userChallengesRepository.find({
      where: { challenge: { id: challengeId } },
      relations: ["user", "challenge", "challenge.sessions"],
    });
    if (!userChallenges) {
      throw new NotFoundException(
        `User programs for content ${challengeId} not found`,
      );
    }
    return userChallenges;
  }
}
