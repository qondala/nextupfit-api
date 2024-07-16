import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTrainingContentLinkDto } from "./dto/create-trainingcontentlink.dto";
import { UpdateTrainingContentLinkDto } from "./dto/update-trainingcontentlink.dto";
import { TrainingContentLink } from "../../entities/training-content-link.entity";

@Injectable()
export class TrainingContentLinksService {
  constructor(
    @InjectRepository(TrainingContentLink)
    private trainingContentLinksRepository: Repository<TrainingContentLink>,
  ) {}

  async create(
    createTrainingContentLinkDto: CreateTrainingContentLinkDto,
    coachId: number,
  ): Promise<TrainingContentLink> {
    const trainingContentLink = this.trainingContentLinksRepository.create({
      ...createTrainingContentLinkDto,
      session: { id: createTrainingContentLinkDto.sessionId },
      content: { id: createTrainingContentLinkDto.contentId },
    });
    return this.trainingContentLinksRepository.save(trainingContentLink);
  }

  async findAll(): Promise<TrainingContentLink[]> {
    return this.trainingContentLinksRepository.find({
      relations: ["session", "content"],
    });
  }

  async findOne(id: number): Promise<TrainingContentLink> {
    const trainingContentLink =
      await this.trainingContentLinksRepository.findOne({
        where: { id },
        relations: ["session", "content"],
      });
    if (!trainingContentLink) {
      throw new NotFoundException(
        `Training content link with ID ${id} not found`,
      );
    }
    return trainingContentLink;
  }

  async update(
    id: number,
    updateTrainingContentLinkDto: UpdateTrainingContentLinkDto,
    coachId: number,
  ): Promise<TrainingContentLink> {
    const trainingContentLink =
      await this.trainingContentLinksRepository.preload({
        id,
        ...updateTrainingContentLinkDto,
      });
    if (!trainingContentLink) {
      throw new NotFoundException(
        `Training content link with ID ${id} not found`,
      );
    }
    // Vérifier que le coach est autorisé à modifier le lien
    if (
      trainingContentLink.session.content.coachId !== coachId ||
      trainingContentLink.content.coachId !== coachId
    ) {
      throw new UnauthorizedException(
        "You are not authorized to update this training content link",
      );
    }
    return this.trainingContentLinksRepository.save(trainingContentLink);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const trainingContentLink =
      await this.trainingContentLinksRepository.findOne({
        where: { id },
      });
    if (!trainingContentLink) {
      throw new NotFoundException(
        `Training content link with ID ${id} not found`,
      );
    }
    // Vérifier que le coach est autorisé à supprimer le lien
    if (
      trainingContentLink.session.content.coachId !== coachId ||
      trainingContentLink.content.coachId !== coachId
    ) {
      throw new UnauthorizedException(
        "You are not authorized to delete this training content link",
      );
    }
    await this.trainingContentLinksRepository.delete(id);
  }

  async searchTrainingContentLinks(
    query: string,
  ): Promise<TrainingContentLink[]> {
    const trainingContentLinks = await this.trainingContentLinksRepository.find(
      {
        where: [
          { session: { content: { title: `%${query}%` } } },
          { session: { content: { description: `%${query}%` } } },
          { content: { title: `%${query}%` } },
          { content: { description: `%${query}%` } },
        ],
        relations: ["session", "content"],
      },
    );
    return trainingContentLinks;
  }

  async findBySession(sessionId: number): Promise<TrainingContentLink[]> {
    const trainingContentLinks = await this.trainingContentLinksRepository.find(
      {
        where: { session: { id: sessionId } },
        relations: ["session", "content"],
      },
    );
    if (!trainingContentLinks) {
      throw new NotFoundException(
        `Training content links for session ${sessionId} not found`,
      );
    }
    return trainingContentLinks;
  }

  async findByContent(contentId: number): Promise<TrainingContentLink[]> {
    const trainingContentLinks = await this.trainingContentLinksRepository.find(
      {
        where: { content: { id: contentId } },
        relations: ["session", "content"],
      },
    );
    if (!trainingContentLinks) {
      throw new NotFoundException(
        `Training content links for content ${contentId} not found`,
      );
    }
    return trainingContentLinks;
  }
}
