import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NutritionProgram } from "../../entities/nutrition-program.entity";
import { Repository } from "typeorm";
import { CreateNutritionProgramDto } from "./dto/create-userprogram.dto";
import { UpdateNutritionProgramDto } from "./dto/update-userprogram.dto";

@Injectable()
export class NutritionProgramsService {
  constructor(
    @InjectRepository(NutritionProgram)
    private nutritionProgramsRepository: Repository<NutritionProgram>,
  ) {}

  async create(
    createNutritionProgramDto: CreateNutritionProgramDto,
    coachId: number,
  ): Promise<NutritionProgram> {
    const nutritionProgram = this.nutritionProgramsRepository.create(
      createNutritionProgramDto,
    );
    return this.nutritionProgramsRepository.save(nutritionProgram);
  }

  async findAll(): Promise<NutritionProgram[]> {
    return this.nutritionProgramsRepository.find({
      relations: [
        "userNutritionProgress",
        "nutritionDetails",
        "reviews",
        "coach",
      ],
    });
  }

  async findOne(id: number): Promise<NutritionProgram> {
    const nutritionProgram = await this.nutritionProgramsRepository.findOne({
      where: { id },
      relations: ["contents", "nutritionDetails", "reviews", "coach"],
    });
    if (!nutritionProgram) {
      throw new NotFoundException(`Nutrition program with ID ${id} not found`);
    }
    return nutritionProgram;
  }

  async update(
    id: number,
    updateNutritionProgramDto: UpdateNutritionProgramDto,
    coachId: number,
  ): Promise<NutritionProgram> {
    const nutritionProgram = await this.nutritionProgramsRepository.preload({
      id,
      ...updateNutritionProgramDto,
    });
    if (!nutritionProgram) {
      throw new NotFoundException(`Nutrition program with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à modifier le programme nutritionnel
    if (nutritionProgram.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this nutrition program",
      );
    }
    return this.nutritionProgramsRepository.save(nutritionProgram);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const nutritionProgram = await this.nutritionProgramsRepository.findOne({
      where: { id },
    });
    if (!nutritionProgram) {
      throw new NotFoundException(`Nutrition program with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à supprimer le programme nutritionnel
    if (nutritionProgram.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this nutrition program",
      );
    }
    await this.nutritionProgramsRepository.delete(id);
  }

  async searchNutritionPrograms(query: string): Promise<NutritionProgram[]> {
    const nutritionPrograms = await this.nutritionProgramsRepository.find({
      where: [{ title: `%${query}%` }, { description: `%${query}%` }],
      relations: [
        "contentNutrition",
        "userNutrition",
        "userNutritionProgress",
        "nutritionDetails",
        "reviews",
      ],
    });
    return nutritionPrograms;
  }
}
