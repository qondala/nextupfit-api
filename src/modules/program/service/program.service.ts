import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";
import { ProgramEntity } from "../entity";
import { CreateProgramDto, UpdateProgramDto } from "../dto";

@Injectable()
export class ProgramService {
  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepository: Repository<ProgramEntity>
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<ProgramEntity> {
    const program = this.programRepository.create(createProgramDto);
    return await this.programRepository.save(program);
  }

  async findAll(options: PaginationOptionsDto): Promise<[ProgramEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.programRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
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

  async search(query: string, options: PaginationOptionsDto): Promise<[ProgramEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [programs, total] = await this.programRepository
      .createQueryBuilder("program")
      .where("program.name ILIKE :query", { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .orderBy("program.createdAt", "DESC")
      .getManyAndCount();

    return [programs, total];
  }
}
