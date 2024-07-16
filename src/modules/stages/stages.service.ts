import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStageDto } from "./dto/create-stage.dto";
import { Stage } from "../../entities/stage.entity";
import { UpdateStageDto } from "./dto/update-stage.dto";

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private stagesRepository: Repository<Stage>,
  ) {}

  async create(
    createStageDto: CreateStageDto,
    coachId: number,
  ): Promise<Stage> {
    const stage = this.stagesRepository.create({
      ...createStageDto,
      content: { id: createStageDto.contentId },
    });
    return this.stagesRepository.save(stage);
  }

  async findAll(): Promise<Stage[]> {
    return this.stagesRepository.find({
      relations: ["content"],
    });
  }

  async findOne(id: number): Promise<Stage> {
    const stage = await this.stagesRepository.findOne({
      where: { id },
      relations: ["content"],
    });
    if (!stage) {
      throw new NotFoundException(`Stage with ID ${id} not found`);
    }
    return stage;
  }

  async update(
    id: number,
    updateStageDto: UpdateStageDto,
    coachId: number,
  ): Promise<Stage> {
    const stage = await this.stagesRepository.preload({
      id,
      ...updateStageDto,
    });
    if (!stage) {
      throw new NotFoundException(`Stage with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à modifier l'étape
    if (stage.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this stage",
      );
    }
    return this.stagesRepository.save(stage);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const stage = await this.stagesRepository.findOne({
      where: { id },
    });
    if (!stage) {
      throw new NotFoundException(`Stage with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à supprimer l'étape
    if (stage.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this stage",
      );
    }
    await this.stagesRepository.delete(id);
  }

  async searchStages(query: string): Promise<Stage[]> {
    const stages = await this.stagesRepository.find({
      where: [
        { content: { title: `%${query}%` } },
        { content: { description: `%${query}%` } },
        { title: `%${query}%` },
        { description: `%${query}%` },
      ],
      relations: ["content"],
    });
    return stages;
  }

  async findByContent(contentId: number): Promise<Stage[]> {
    const stages = await this.stagesRepository.find({
      where: { content: { id: contentId } },
      relations: ["content"],
    });
    if (!stages) {
      throw new NotFoundException(`Stages for content ${contentId} not found`);
    }
    return stages;
  }
}
