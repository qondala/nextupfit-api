import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";
import { ProgramWorkoutNutrientBurnEntity } from "../entity";
import { CreateProgramWorkoutNutrientBurnDto, UpdateProgramWorkoutNutrientBurnDto } from "../dto";

@Injectable()
export class ProgramWorkoutNutrientBurnService {
  constructor(
    @InjectRepository(ProgramWorkoutNutrientBurnEntity)
    private readonly programWorkoutNutrientBurnRepository: Repository<ProgramWorkoutNutrientBurnEntity>
  ) {}

  async create(createProgramWorkoutNutrientBurnDto: CreateProgramWorkoutNutrientBurnDto): Promise<ProgramWorkoutNutrientBurnEntity> {
    const programWorkoutNutrientBurn = this.programWorkoutNutrientBurnRepository.create(createProgramWorkoutNutrientBurnDto);
    return await this.programWorkoutNutrientBurnRepository.save(programWorkoutNutrientBurn);
  }

  async findAll(options: PaginationOptionsDto): Promise<[ProgramWorkoutNutrientBurnEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.programWorkoutNutrientBurnRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findOne(id: number): Promise<ProgramWorkoutNutrientBurnEntity> {
    const programWorkoutNutrientBurn = await this.programWorkoutNutrientBurnRepository.findOne({ where: { id } });
    if (!programWorkoutNutrientBurn) {
      throw new Error(`Program workout nutrient burn with ID ${id} not found`);
    }
    return programWorkoutNutrientBurn;
  }

  async update(id: number, updateProgramWorkoutNutrientBurnDto: UpdateProgramWorkoutNutrientBurnDto): Promise<ProgramWorkoutNutrientBurnEntity> {
    const programWorkoutNutrientBurn = await this.findOne(id);
    Object.assign(programWorkoutNutrientBurn, updateProgramWorkoutNutrientBurnDto);
    return await this.programWorkoutNutrientBurnRepository.save(programWorkoutNutrientBurn);
  }

  async remove(id: number): Promise<void> {
    const programWorkoutNutrientBurn = await this.findOne(id);
    await this.programWorkoutNutrientBurnRepository.remove(programWorkoutNutrientBurn);
  }

  async findByProgramStepActivityId(programStepActivityId: number, options: PaginationOptionsDto): Promise<[ProgramWorkoutNutrientBurnEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.programWorkoutNutrientBurnRepository.findAndCount({
      where: { programStepActivityId },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }
}
