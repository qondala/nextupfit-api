import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ProgramStepActivityEntity } from "../entity";
import { CreateProgramStepActivityDto, UpdateProgramStepActivityDto } from "../dto";


@Injectable()
export class ProgramStepActivityService {
  constructor(
    @InjectRepository(ProgramStepActivityEntity)
    private readonly programStepActivityRepository: Repository<ProgramStepActivityEntity>
  ) {}

  async create(createProgramStepActivityDto: CreateProgramStepActivityDto): Promise<ProgramStepActivityEntity> {
    const programStepActivity = this.programStepActivityRepository.create(createProgramStepActivityDto);
    return await this.programStepActivityRepository.save(programStepActivity);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramStepActivityEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programStepActivityRepository.createQueryBuilder("programStepActivity");

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy("programStepActivity.createdAt", "DESC")
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

  async findOne(id: number): Promise<ProgramStepActivityEntity> {
    const programStepActivity = await this.programStepActivityRepository.findOne({ where: { id } });
    if (!programStepActivity) {
      throw new Error(`Program step activity with ID ${id} not found`);
    }
    return programStepActivity;
  }

  async update(id: number, updateProgramStepActivityDto: UpdateProgramStepActivityDto): Promise<ProgramStepActivityEntity> {
    const programStepActivity = await this.findOne(id);
    Object.assign(programStepActivity, updateProgramStepActivityDto);
    return await this.programStepActivityRepository.save(programStepActivity);
  }

  async remove(id: number): Promise<void> {
    const programStepActivity = await this.findOne(id);
    await this.programStepActivityRepository.remove(programStepActivity);
  }

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramStepActivityEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programStepActivityRepository.createQueryBuilder("programStepActivity");

    const [items, totalItems] = await queryBuilder
      .where("programStepActivity.name ILIKE :query", { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .orderBy("programStepActivity.ratingsAvg", "ASC")
      .orderBy("programStepActivity.attendeesCount", "ASC")
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

  async findByStepId(programStepId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramStepActivityEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programStepActivityRepository.createQueryBuilder("programStepActivity");

    const [items, totalItems] = await queryBuilder
      .where({ programStepId })
      .skip(skip)
      .take(limit)
      .orderBy("programStepActivity.position", "ASC")
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
}

