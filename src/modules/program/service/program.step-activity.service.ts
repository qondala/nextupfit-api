import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";
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

  async findAll(options: PaginationOptionsDto): Promise<[ProgramStepActivityEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.programStepActivityRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
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

  async search(query: string, options: PaginationOptionsDto): Promise<[ProgramStepActivityEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [programStepActivities, total] = await this.programStepActivityRepository
      .createQueryBuilder("programStepActivity")
      .where("programStepActivity.name ILIKE :query", { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .orderBy("programStepActivity.createdAt", "DESC")
      .getManyAndCount();

    return [programStepActivities, total];
  }

  async findByProgramStepId(programStepId: number, options: PaginationOptionsDto): Promise<[ProgramStepActivityEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.programStepActivityRepository.findAndCount({
      where: { programStepId },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }
}
