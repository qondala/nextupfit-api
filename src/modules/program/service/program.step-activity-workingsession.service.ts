import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import {
  CreateProgramStepActivityWorkingsessionDto,
  UpdateProgramStepActivityWorkingsessionDto
} from "../dto";
import {
  ProgramStepActivityWorkingsessionEntity
} from "../entity";


@Injectable()
export class ProgramStepActivityWorkingsessionService {
  constructor(
    @InjectRepository(ProgramStepActivityWorkingsessionEntity)
    private readonly programStepActivityWorkingsessionRepository: Repository<ProgramStepActivityWorkingsessionEntity>
  ) {}

  async create(createProgramStepActivityWorkingsessionDto: CreateProgramStepActivityWorkingsessionDto): Promise<ProgramStepActivityWorkingsessionEntity> {
    const programStepActivityWorkingsession = this.programStepActivityWorkingsessionRepository.create(createProgramStepActivityWorkingsessionDto);
    return await this.programStepActivityWorkingsessionRepository.save(programStepActivityWorkingsession);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramStepActivityWorkingsessionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programStepActivityWorkingsessionRepository.createQueryBuilder("programStepActivityWorkingsession");

    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
      .orderBy("programStepActivityWorkingsession.createdAt", "DESC")
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

  async findOne(id: number): Promise<ProgramStepActivityWorkingsessionEntity> {
    const programStepActivityWorkingsession = await this.programStepActivityWorkingsessionRepository.findOne({ where: { id } });
    if (!programStepActivityWorkingsession) {
      throw new Error(`Program step activity workingsession with ID ${id} not found`);
    }
    return programStepActivityWorkingsession;
  }

  async update(id: number, updateProgramStepActivityWorkingsessionDto: UpdateProgramStepActivityWorkingsessionDto): Promise<ProgramStepActivityWorkingsessionEntity> {
    const programStepActivityWorkingsession = await this.findOne(id);
    Object.assign(programStepActivityWorkingsession, updateProgramStepActivityWorkingsessionDto);
    return await this.programStepActivityWorkingsessionRepository.save(programStepActivityWorkingsession);
  }

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramStepActivityWorkingsessionEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programStepActivityWorkingsessionRepository.createQueryBuilder("programStepActivityWorkingsession");

    const [items, totalItems] = await queryBuilder
      .where("programStepActivityWorkingsession.name ILIKE :query", { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .orderBy("programStepActivityWorkingsession.position", "ASC")
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

  async remove(id: number): Promise<void> {
    await this.programStepActivityWorkingsessionRepository.delete(id);
  }
}
