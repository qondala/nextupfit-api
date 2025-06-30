import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateProgramStepActivityWorkingsessionWorkoutDto,
  UpdateProgramStepActivityWorkingsessionWorkoutDto
} from "../dto";
import {
  ProgramStepActivityWorkingsessionWorkoutEntity
} from "../entity";


@Injectable()
export class ProgramStepActivityWorkingsessionWorkoutService {
  constructor(
    @InjectRepository(ProgramStepActivityWorkingsessionWorkoutEntity)
    private readonly programStepActivityWorkingsessionWorkoutRepository: Repository<ProgramStepActivityWorkingsessionWorkoutEntity>,
  ) {}

  async create(createProgramStepActivityWorkingsessionWorkoutDto: CreateProgramStepActivityWorkingsessionWorkoutDto): Promise<ProgramStepActivityWorkingsessionWorkoutEntity> {
    const programStepActivityWorkingsessionWorkout = this.programStepActivityWorkingsessionWorkoutRepository.create(createProgramStepActivityWorkingsessionWorkoutDto);
    return await this.programStepActivityWorkingsessionWorkoutRepository.save(programStepActivityWorkingsessionWorkout);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramStepActivityWorkingsessionWorkoutEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programStepActivityWorkingsessionWorkoutRepository.createQueryBuilder("programStepActivityWorkingsessionWorkout");

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy("programStepActivityWorkingsessionWorkout.createdAt", "DESC")
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / limit);

    return {
      items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    };
  }

  async findOne(id: number): Promise<ProgramStepActivityWorkingsessionWorkoutEntity> {
    const programStepActivityWorkingsessionWorkout = await this.programStepActivityWorkingsessionWorkoutRepository.findOne({ where: { id } });
    if (!programStepActivityWorkingsessionWorkout) {
      throw new Error(`Program step activity workingsession workout with ID ${id} not found`);
    }
    return programStepActivityWorkingsessionWorkout;
  }

  async update(id: number, updateProgramStepActivityWorkingsessionWorkoutDto: UpdateProgramStepActivityWorkingsessionWorkoutDto): Promise<ProgramStepActivityWorkingsessionWorkoutEntity> {
    const programStepActivityWorkingsessionWorkout = await this.findOne(id);
    Object.assign(programStepActivityWorkingsessionWorkout, updateProgramStepActivityWorkingsessionWorkoutDto);
    return await this.programStepActivityWorkingsessionWorkoutRepository.save(programStepActivityWorkingsessionWorkout);
  }

  async remove(id: number): Promise<void> {
    await this.programStepActivityWorkingsessionWorkoutRepository.delete(id);
  }
}
