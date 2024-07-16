import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNutritionDetailDto } from "./dto/create-nutritiondetail.dto";
import { UpdateNutritionDetailDto } from "./dto/update-nutritiondetail.dto";
import { NutritionDetail } from "../../entities/nutrition-detail.entity";

@Injectable()
export class NutritionDetailsService {
  constructor(
    @InjectRepository(NutritionDetail)
    private nutritionDetailsRepository: Repository<NutritionDetail>,
  ) {}

  async create(
    createNutritionDetailDto: CreateNutritionDetailDto,
    coachId: number,
  ): Promise<NutritionDetail> {
    const nutritionDetail = this.nutritionDetailsRepository.create({
      ...createNutritionDetailDto,
      nutritionProgram: { id: createNutritionDetailDto.nutritionProgramId },
    });
    return this.nutritionDetailsRepository.save(nutritionDetail);
  }

  async findAll(): Promise<NutritionDetail[]> {
    return this.nutritionDetailsRepository.find({
      relations: ["nutritionProgram"],
    });
  }

  async findOne(id: number): Promise<NutritionDetail> {
    const nutritionDetail = await this.nutritionDetailsRepository.findOne({
      where: { id },
      relations: ["nutritionProgram"],
    });
    if (!nutritionDetail) {
      throw new NotFoundException(`Nutrition detail with ID ${id} not found`);
    }
    return nutritionDetail;
  }

  async update(
    id: number,
    updateNutritionDetailDto: UpdateNutritionDetailDto,
    coachId: number,
  ): Promise<NutritionDetail> {
    const nutritionDetail = await this.nutritionDetailsRepository.preload({
      id,
      ...updateNutritionDetailDto,
    });
    if (!nutritionDetail) {
      throw new NotFoundException(`Nutrition detail with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à modifier le détail nutritionnel
    if (nutritionDetail.nutritionProgram.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to update this nutrition detail",
      );
    }
    return this.nutritionDetailsRepository.save(nutritionDetail);
  }

  async remove(id: number, coachId: number): Promise<void> {
    const nutritionDetail = await this.nutritionDetailsRepository.findOne({
      where: { id },
    });
    if (!nutritionDetail) {
      throw new NotFoundException(`Nutrition detail with ID ${id} not found`);
    }
    // Vérifier que le coach est autorisé à supprimer le détail nutritionnel
    if (nutritionDetail.nutritionProgram.coach.id !== coachId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this nutrition detail",
      );
    }
    await this.nutritionDetailsRepository.delete(id);
  }

  async searchNutritionDetails(query: string): Promise<NutritionDetail[]> {
    const nutritionDetails = await this.nutritionDetailsRepository.find({
      where: [
        { nutritionProgram: { title: `%${query}%` } },
        { nutritionProgram: { description: `%${query}%` } },
        { ingredients: `%${query}%` },
        { preparation: `%${query}%` },
      ],
      relations: ["nutritionProgram"],
    });
    return nutritionDetails;
  }

  async findByProgram(programId: number): Promise<NutritionDetail[]> {
    const nutritionDetails = await this.nutritionDetailsRepository.find({
      where: { nutritionProgram: { id: programId } },
      relations: ["nutritionProgram"],
    });
    if (!nutritionDetails) {
      throw new NotFoundException(
        `Nutrition details for program ${programId} not found`,
      );
    }
    return nutritionDetails;
  }
}
