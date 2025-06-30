import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";

import { ProgramEntity } from "../entity";
import { CreateProgramDto, UpdateProgramDto } from "../dto";


@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<ProgramEntity> {
    const program = this.programRepository.create(createProgramDto);
    return await this.programRepository.save(program);
  }

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programRepository.createQueryBuilder("program");
    const [items, totalItems] = await queryBuilder
      .skip(skip)
      .take(limit)
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

  async findOne(id: number): Promise<ProgramEntity> {
    const program = await this.programRepository.findOne({ where: { id } });
    if (!program) {
      throw new Error(`Program with ID ${id} not found`);
    }
    return program;
  }

  async update(id: number, updateProgramDto: UpdateProgramDto): Promise<ProgramEntity> {
    const program = await this.findOne(id);
    Object.assign(program, updateProgramDto);
    return await this.programRepository.save(program);
  }

  async remove(id: number): Promise<void> {
    const program = await this.findOne(id);
    await this.programRepository.remove(program);
  }

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const queryBuilder = this.programRepository.createQueryBuilder("program");

    const [items, totalItems] = await queryBuilder
      .where("program.name ILIKE :query", { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .orderBy("program.ratingsAvg", "ASC")
      .orderBy("program.attendeesCount", "ASC")
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
