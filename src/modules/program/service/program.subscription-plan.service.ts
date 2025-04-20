import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";
import { ProgramSubscriptionPlanEntity } from "../entity";
import { CreateProgramSubscriptionPlanDto, UpdateProgramSubscriptionPlanDto } from "../dto";

@Injectable()
export class ProgramSubscriptionPlanService {
  constructor(
    @InjectRepository(ProgramSubscriptionPlanEntity)
    private readonly programSubscriptionPlanRepository: Repository<ProgramSubscriptionPlanEntity>
  ) {}

  async create(createProgramSubscriptionPlanDto: CreateProgramSubscriptionPlanDto): Promise<ProgramSubscriptionPlanEntity> {
    const programSubscriptionPlan = this.programSubscriptionPlanRepository.create(createProgramSubscriptionPlanDto);
    return await this.programSubscriptionPlanRepository.save(programSubscriptionPlan);
  }

  async findAll(options: PaginationOptionsDto): Promise<[ProgramSubscriptionPlanEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.programSubscriptionPlanRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findOne(id: number): Promise<ProgramSubscriptionPlanEntity> {
    const programSubscriptionPlan = await this.programSubscriptionPlanRepository.findOne({ where: { id } });
    if (!programSubscriptionPlan) {
      throw new Error(`Program subscription plan with ID ${id} not found`);
    }
    return programSubscriptionPlan;
  }

  async update(id: number, updateProgramSubscriptionPlanDto: UpdateProgramSubscriptionPlanDto): Promise<ProgramSubscriptionPlanEntity> {
    const programSubscriptionPlan = await this.findOne(id);
    Object.assign(programSubscriptionPlan, updateProgramSubscriptionPlanDto);
    return await this.programSubscriptionPlanRepository.save(programSubscriptionPlan);
  }

  async remove(id: number): Promise<void> {
    const programSubscriptionPlan = await this.findOne(id);
    await this.programSubscriptionPlanRepository.remove(programSubscriptionPlan);
  }

  async search(query: string, options: PaginationOptionsDto): Promise<[ProgramSubscriptionPlanEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [programSubscriptionPlans, total] = await this.programSubscriptionPlanRepository
      .createQueryBuilder("programSubscriptionPlan")
      .where("programSubscriptionPlan.planName ILIKE :query", { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .orderBy("programSubscriptionPlan.createdAt", "DESC")
      .getManyAndCount();

    return [programSubscriptionPlans, total];
  }
}
