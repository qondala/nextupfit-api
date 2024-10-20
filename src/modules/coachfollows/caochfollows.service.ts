import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCoachFollowDto } from "./dto/create-coachfollow.dto";
import { UpdateCoachFollowDto } from "./dto/update-coachfollow.dto";
import { CoachFollow } from "../../entities/coach-follow.entity";

@Injectable()
export class CoachFollowsService {
  constructor(
    @InjectRepository(CoachFollow)
    private CoachFollowsRepository: Repository<CoachFollow>,
  ) {}

  async create(
    createCoachFollowDto: CreateCoachFollowDto,
    userId: number,
  ): Promise<CoachFollow> {
    const coachFollow = this.CoachFollowsRepository.create({
      ...createCoachFollowDto,
      user: { id: userId },
      coach: { id: createCoachFollowDto.coachId },
    });
    return this.CoachFollowsRepository.save(coachFollow);
  }

  async findAll(): Promise<CoachFollow[]> {
    return this.CoachFollowsRepository.find({
      relations: ["user", "coach"],
    });
  }

  async findOne(id: number): Promise<CoachFollow> {
    const coachFollow = await this.CoachFollowsRepository.findOne({
      where: { id },
      relations: ["user", "coach"],
    });
    if (!coachFollow) {
      throw new NotFoundException(`Coach rating with ID ${id} not found`);
    }
    return coachFollow;
  }

  async update(
    id: number,
    updateCoachFollowDto: UpdateCoachFollowDto,
    userId: number,
  ): Promise<CoachFollow> {
    const coachFollow = await this.CoachFollowsRepository.preload({
      id,
      ...updateCoachFollowDto,
    });
    if (!coachFollow) {
      throw new NotFoundException(`Coach rating with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier son évaluation
    if (coachFollow.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this coach rating",
      );
    }
    return this.CoachFollowsRepository.save(coachFollow);
  }

  async remove(id: number, userId: number): Promise<void> {
    const coachFollow = await this.CoachFollowsRepository.findOne({
      where: { id },
      relations: ["user", "coach"],
    });
    if (!coachFollow) {
      throw new NotFoundException(`Coach rating with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer son évaluation
    if (coachFollow.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this coach rating",
      );
    }
    await this.CoachFollowsRepository.delete(id);
  }

  async searchCoachFollows(query: string): Promise<CoachFollow[]> {
    const CoachFollows = await this.CoachFollowsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { coach: { user: { firstName: `%${query}%` } } },
        { coach: { user: { lastName: `%${query}%` } } },
        { coach: { user: { email: `%${query}%` } } },
        //{ comment: `%${query}%` },
      ],
      relations: ["user", "coach"],
    });
    return CoachFollows;
  }

  async findByUser(userId: number): Promise<CoachFollow[]> {
    const coachFollows = await this.CoachFollowsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "coach"],
    });
    if (!coachFollows) {
      throw new NotFoundException(`Coach ratings for user ${userId} not found`);
    }
    return coachFollows;
  }

  async findByCoach(coachId: number): Promise<CoachFollow[]> {
    const coachFollows = await this.CoachFollowsRepository.find({
      where: { coach: { id: coachId } },
      relations: ["user", "coach"],
    });
    if (!coachFollows) {
      throw new NotFoundException(
        `Coach ratings for coach ${coachId} not found`,
      );
    }
    return coachFollows;
  }
}
