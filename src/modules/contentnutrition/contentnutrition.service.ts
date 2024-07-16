import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateContentNutritionDto } from "./dto/create-contentnutrition.dto";
import { ContentNutrition } from "../../entities/content-nutrition.entity";
import { UpdateContentNutritionDto } from "./dto/update-contentnutrition.dto";

@Injectable()
export class ContentNutritionService {
  constructor(
    @InjectRepository(ContentNutrition)
    private contentNutritionRepository: Repository<ContentNutrition>,
  ) {}

  async create(
    createContentNutritionDto: CreateContentNutritionDto,
    coachId: number,
  ): Promise<ContentNutrition> {
    const contentNutrition = this.contentNutritionRepository.create({
      ...createContentNutritionDto,
      content: { id: createContentNutritionDto.contentId },
      nutritionProgram: { id: createContentNutritionDto.nutritionProgramId },
    });
    return this.contentNutritionRepository.save(contentNutrition);
  }

  async findAll(): Promise<ContentNutrition[]> {
    return this.contentNutritionRepository.find({
      relations: ["content", "nutritionProgram"],
    });
  }

  async findOne(id: number): Promise<ContentNutrition> {
    const contentNutrition = await this.contentNutritionRepository.findOne({
      where: { id },
      relations: ["content", "nutritionProgram"],
    });
    if (!contentNutrition) {
      throw new NotFoundException(`Content nutrition with ID ${id} not found`);
    }
    return contentNutrition;
  }

  async update(
    id: number,
    updateContentNutritionDto: UpdateContentNutritionDto,
    coachId: number,
  ): Promise<ContentNutrition> {
    const contentNutrition = await this.contentNutritionRepository.preload({
      id,
      ...updateContentNutritionDto,
    });
    if (!contentNutrition) {
      throw new NotFoundException(`Content nutrition with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à modifier l'association
    if (contentNutrition.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this content nutrition",
      );
    }
    return this.contentNutritionRepository.save(contentNutrition);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const contentNutrition = await this.contentNutritionRepository.findOne({
      where: { id },
    });
    if (!contentNutrition) {
      throw new NotFoundException(`Content nutrition with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à supprimer l'association
    if (contentNutrition.content.coachId !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this content nutrition",
      );
    }
    await this.contentNutritionRepository.delete(id);
  }

  async searchContentNutrition(query: string): Promise<ContentNutrition[]> {
    const contentNutrition = await this.contentNutritionRepository.find({
      where: [
        { content: { title: `%${query}%` } },
        { content: { description: `%${query}%` } },
        { nutritionProgram: { title: `%${query}%` } },
        { nutritionProgram: { description: `%${query}%` } },
      ],
      relations: ["content", "nutritionProgram"],
    });
    return contentNutrition;
  }

  async findByContent(contentId: number): Promise<ContentNutrition[]> {
    const contentNutrition = await this.contentNutritionRepository.find({
      where: { content: { id: contentId } },
      relations: ["content", "nutritionProgram"],
    });
    if (!contentNutrition) {
      throw new NotFoundException(
        `Content nutrition for content ${contentId} not found`,
      );
    }
    return contentNutrition;
  }

  async findByProgram(programId: number): Promise<ContentNutrition[]> {
    const contentNutrition = await this.contentNutritionRepository.find({
      where: { nutritionProgram: { id: programId } },
      relations: ["content", "nutritionProgram"],
    });
    if (!contentNutrition) {
      throw new NotFoundException(
        `Content nutrition for program ${programId} not found`,
      );
    }
    return contentNutrition;
  }
}
