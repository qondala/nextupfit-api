import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";

import { ProgramSubscriptionPlanEntity } from "../entity";
import { PaginatedResponseDto } from "@app/common/dto";
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

  async findAll(options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramSubscriptionPlanEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.programSubscriptionPlanRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

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

  async search(query: string, options: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramSubscriptionPlanEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [programSubscriptionPlans, total] = await this.programSubscriptionPlanRepository
      .createQueryBuilder("programSubscriptionPlan")
      .where("programSubscriptionPlan.planName ILIKE :query", { query: `%${query}%` })
      .skip(skip)
      .take(limit)
      .orderBy("programSubscriptionPlan.createdAt", "DESC")
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    return {
      items: programSubscriptionPlans,
      meta: {
        totalItems: total,
        itemCount: programSubscriptionPlans.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page
      }
    };
  }


    /**
     * Fetches program subscription plans.
     * 
     * @param programId The ID of the program.
     * @returns An array of program subscription plans.
     */
    async fetchProgramSubscriptionPlans(programId: number): Promise<ProgramSubscriptionPlanEntity[]> {
      const programSubscriptionPlans = await this.programSubscriptionPlanRepository.find({
        where: {
          programId
        }
      });

      return programSubscriptionPlans;
    }
}
