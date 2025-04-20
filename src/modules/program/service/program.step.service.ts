import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";
import { ProgramStepEntity } from "../entity";
import { CreateProgramStepDto, UpdateProgramStepDto } from "../dto";

@Injectable()
export class ProgramStepService {
  constructor(
    @InjectRepository(ProgramStepEntity)
    private readonly programStepRepository: Repository<ProgramStepEntity>
  ) {}

  async create(createProgramStepDto: CreateProgramStepDto): Promise<ProgramStepEntity> {
    const programStep = this.programStepRepository.create(createProgramStepDto);
    return await this.programStepRepository.save(programStep);
  }

  async findAll(options: PaginationOptionsDto): Promise<[ProgramStepEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.programStepRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findOne(id: number): Promise<ProgramStepEntity> {
    const programStep = await this.programStepRepository.findOne({ where: { id } });
    if (!programStep) {
      throw new Error(`Program step with ID ${id} not found`);
    }
    return programStep;
  }

  async update(id: number, updateProgramStepDto: UpdateProgramStepDto): Promise<ProgramStepEntity> {
    const programStep = await this.findOne(id);
    Object.assign(programStep, updateProgramStepDto);
    return await this.programStepRepository.save(programStep);
  }

  async remove(id: number): Promise<void> {
    const programStep = await this.findOne(id);
    await this.programStepRepository.remove(programStep);
  }

  async search(query: string, options: PaginationOptionsDto): Promise<[ProgramStepEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [programSteps, total] = await this.programStepRepository
      .createQueryBuilder("programStep")
      .where("programStep.name ILIKE :query", { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .orderBy("programStep.createdAt", "DESC")
      .getManyAndCount();

    return [programSteps, total];
  }

  async findByProgramId(programId: number, options: PaginationOptionsDto): Promise<[ProgramStepEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.programStepRepository.findAndCount({
      where: { programId },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }
} 