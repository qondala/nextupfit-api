import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PrivateDiscussion } from "../../entities/private-discussion.entity";
import { Repository } from "typeorm";
import { CreatePrivateDiscussionDto } from "./dto/create-privatediscussion";
import { UpdatePrivateDiscussionDto } from "./dto/update-privatediscussion.dto";

@Injectable()
export class PrivateDiscussionsService {
  constructor(
    @InjectRepository(PrivateDiscussion)
    private privateDiscussionsRepository: Repository<PrivateDiscussion>,
  ) {}

  async create(
    createPrivateDiscussionDto: CreatePrivateDiscussionDto,
    userId: number,
  ): Promise<PrivateDiscussion> {
    const privateDiscussion = this.privateDiscussionsRepository.create({
      ...createPrivateDiscussionDto,
      user: { id: userId },
      coach: { id: createPrivateDiscussionDto.coachId },
    });
    return this.privateDiscussionsRepository.save(privateDiscussion);
  }

  async findAll(): Promise<PrivateDiscussion[]> {
    return this.privateDiscussionsRepository.find({
      relations: ["user", "coach"],
    });
  }

  async findOne(id: number): Promise<PrivateDiscussion> {
    const privateDiscussion = await this.privateDiscussionsRepository.findOne({
      where: { id },
      relations: ["user", "coach"],
    });
    if (!privateDiscussion) {
      throw new NotFoundException(`Private discussion with ID ${id} not found`);
    }
    return privateDiscussion;
  }

  async update(
    id: number,
    updatePrivateDiscussionDto: UpdatePrivateDiscussionDto,
    userId: number,
  ): Promise<PrivateDiscussion> {
    const privateDiscussion = await this.privateDiscussionsRepository.preload({
      id,
      ...updatePrivateDiscussionDto,
    });
    if (!privateDiscussion) {
      throw new NotFoundException(`Private discussion with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur ou le coach est autorisé à modifier la discussion
    if (
      privateDiscussion.user.id !== userId &&
      privateDiscussion.coach.id !== userId
    ) {
      throw new UnauthorizedException(
        "You are not authorized to update this private discussion",
      );
    }
    return this.privateDiscussionsRepository.save(privateDiscussion);
  }

  async remove(id: number, userId: number): Promise<void> {
    const privateDiscussion = await this.privateDiscussionsRepository.findOne({
      where: { id },
    });
    if (!privateDiscussion) {
      throw new NotFoundException(`Private discussion with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur ou le coach est autorisé à supprimer la discussion
    if (
      privateDiscussion.user.id !== userId &&
      privateDiscussion.coach.id !== userId
    ) {
      throw new UnauthorizedException(
        "You are not authorized to delete this private discussion",
      );
    }
    await this.privateDiscussionsRepository.delete(id);
  }

  async searchPrivateDiscussions(query: string): Promise<PrivateDiscussion[]> {
    const privateDiscussions = await this.privateDiscussionsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { coach: { user: { firstName: `%${query}%` } } },
        { coach: { user: { lastName: `%${query}%` } } },
        { coach: { user: { email: `%${query}%` } } },
        { message: `%${query}%` },
      ],
      relations: ["user", "coach"],
    });
    return privateDiscussions;
  }

  async findByUser(userId: number): Promise<PrivateDiscussion[]> {
    const privateDiscussions = await this.privateDiscussionsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "coach"],
    });
    if (!privateDiscussions) {
      throw new NotFoundException(
        `Private discussions for user ${userId} not found`,
      );
    }
    return privateDiscussions;
  }

  async findByCoach(coachId: number): Promise<PrivateDiscussion[]> {
    const privateDiscussions = await this.privateDiscussionsRepository.find({
      where: { coach: { id: coachId } },
      relations: ["user", "coach"],
    });
    if (!privateDiscussions) {
      throw new NotFoundException(
        `Private discussions for coach ${coachId} not found`,
      );
    }
    return privateDiscussions;
  }
}
