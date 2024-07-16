import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateContentDto } from "./dto/create-content.dto";
import { UpdateContentDto } from "./dto/update-content.dto";
import { Content } from "../../entities/content.entity";

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  async create(
    createContentDto: CreateContentDto,
    coachId: number,
  ): Promise<Content> {
    const content = this.contentRepository.create({
      ...createContentDto,
      coachId,
    });
    return this.contentRepository.save(content);
  }

  async findAll(): Promise<Content[]> {
    return this.contentRepository.find({
      relations: [
        "coach",
        "category",
        "goals",
        "ratings",
        "reviews",
        "sessions",
        "affiliatePrograms",
        "payments",
        "userPrograms",
        "trainingContentLinks",
        "contentNutrition",
      ],
    });
  }

  async findOne(id: number): Promise<Content> {
    const content = await this.contentRepository.findOne({
      where: { id },
      relations: [
        "coach",
        "category",
        "goals",
        "ratings",
        "reviews",
        "sessions",
        "affiliatePrograms",
        "payments",
        "userPrograms",
        "trainingContentLinks",
        "contentNutrition",
      ],
    });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }

  async update(
    id: number,
    updateContentDto: UpdateContentDto,
    coachId: number,
  ): Promise<Content> {
    const content = await this.contentRepository.preload({
      id,
      ...updateContentDto,
    });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    if (content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this content",
      );
    }
    return this.contentRepository.save(content);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const content = await this.contentRepository.findOne({
      where: { id },
    });
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    if (content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this content",
      );
    }
    await this.contentRepository.delete(id);
  }

  async searchContent(query: string): Promise<Content[]> {
    const content = await this.contentRepository.find({
      where: [
        { title: `%${query}%` },
        { description: `%${query}%` },
        { goalSpecifics: `%${query}%` },
      ],
      relations: [
        "coach",
        "category",
        "goals",
        "ratings",
        "reviews",
        "sessions",
        "affiliatePrograms",
        "payments",
        "userPrograms",
        "trainingContentLinks",
        "contentNutrition",
      ],
    });
    return content;
  }

  async findByCategory(categoryId: number): Promise<Content[]> {
    const content = await this.contentRepository.find({
      where: { categoryId },
      relations: [
        "coach",
        "category",
        "goals",
        "ratings",
        "reviews",
        "sessions",
        "affiliatePrograms",
        "payments",
        "userPrograms",
        "trainingContentLinks",
        "contentNutrition",
      ],
    });
    if (!content) {
      throw new NotFoundException(
        `Content for category ${categoryId} not found`,
      );
    }
    return content;
  }
}
