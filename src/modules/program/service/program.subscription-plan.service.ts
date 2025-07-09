import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";
import { PaginatedResponseDto } from "@app/common/dto";

import { ProgramSubscriptionPlanEntity } from "../entity";
import {
  CreateProgramSubscriptionPlanDto,
  UpdateProgramSubscriptionPlanDto,
  ProgramFindCriteriaSubscriptionPlanDto,
  ProgramFindSubscriptionPlanOrderByEnum,
} from "../dto";


@Injectable()
export class ProgramSubscriptionPlanService {
  constructor(
    @InjectRepository(ProgramSubscriptionPlanEntity)
    private readonly repository: Repository<ProgramSubscriptionPlanEntity>
  ) {}

  async create(createProgramSubscriptionPlanDto: CreateProgramSubscriptionPlanDto): Promise<ProgramSubscriptionPlanEntity> {
    const programSubscriptionPlan = this.repository.create(createProgramSubscriptionPlanDto);
    return await this.repository.save(programSubscriptionPlan);
  }

  async findAll(
    criteria: ProgramFindCriteriaSubscriptionPlanDto,
    pagination?: PaginationOptionsDto): Promise<PaginatedResponseDto<ProgramSubscriptionPlanEntity>> {
    
    const queryBuilder = this.repository.createQueryBuilder("programSubscriptionPlan");
    
    queryBuilder.where('programSubscriptionPlan.id != 0');
    
    if (criteria.planName) {
      queryBuilder.andWhere("programSubscriptionPlan.planName ILIKE :planName", { planName: `%${criteria.planName}%` });
    }
    if (criteria.priceHigherThan) {
      queryBuilder.andWhere("programSubscriptionPlan.price >= :priceHigherThan", { priceHigherThan: criteria.priceHigherThan });
    }
    if (criteria.priceLessThan) {
      queryBuilder.andWhere("programSubscriptionPlan.price <= :priceLessThan", { priceLessThan: criteria.priceLessThan });
    }
    if (criteria.periodity) {
      queryBuilder.andWhere("programSubscriptionPlan.periodity = :periodity", { periodity: criteria.periodity });
    }
    if (criteria.description) {
      queryBuilder.andWhere("programSubscriptionPlan.description ILIKE :description", { description: `%${criteria.description}%` });
    }
    if (criteria.programId) {
      queryBuilder.andWhere("programSubscriptionPlan.programId = :programId", { programId: criteria.programId });
    }
    if (criteria.contentId) {
      queryBuilder.andWhere("programSubscriptionPlan.contentId = :contentId", { contentId: criteria.contentId });
    }
    if (criteria.active) {
      queryBuilder.andWhere("programSubscriptionPlan.active = :active", { active: criteria.active });
    }
    
    if (criteria.orderBy) {
      switch (criteria.orderBy) {
        case ProgramFindSubscriptionPlanOrderByEnum.random:
          queryBuilder.addOrderBy('RANDOM()');
          break;
        case ProgramFindSubscriptionPlanOrderByEnum.date:
          queryBuilder.addOrderBy('programSubscriptionPlan.createdAt', 'DESC');
          break;
        case ProgramFindSubscriptionPlanOrderByEnum.price:
          queryBuilder.addOrderBy('programSubscriptionPlan.price', 'ASC');
          break;
        case ProgramFindSubscriptionPlanOrderByEnum.attendeesCount:
          queryBuilder.addOrderBy('programSubscriptionPlan.attendeesCount', 'ASC');
          break;
        case ProgramFindSubscriptionPlanOrderByEnum.ratingsAvg:
          queryBuilder.addOrderBy('programSubscriptionPlan.ratingsAvg', 'ASC');
          break;
        case ProgramFindSubscriptionPlanOrderByEnum.name:
          queryBuilder.addOrderBy('programSubscriptionPlan.planName', 'ASC');
          break;
        default:
          queryBuilder.addOrderBy('programSubscriptionPlan.createdAt', 'DESC');
          break;
      }
    }
    
    const { page, limit } = pagination || { page: 1, limit: 10 };
    const skip = (page - 1) * limit;

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

  async findOne(id: number): Promise<ProgramSubscriptionPlanEntity> {
    const programSubscriptionPlan = await this.repository.findOne({ where: { id } });
    if (!programSubscriptionPlan) {
      throw new Error(`Program subscription plan with ID ${id} not found`);
    }
    return programSubscriptionPlan;
  }

  async update(id: number, updateProgramSubscriptionPlanDto: UpdateProgramSubscriptionPlanDto): Promise<ProgramSubscriptionPlanEntity> {
    const programSubscriptionPlan = await this.findOne(id);
    Object.assign(programSubscriptionPlan, updateProgramSubscriptionPlanDto);
    return await this.repository.save(programSubscriptionPlan);
  }

  async deactivate(id: number): Promise<void> {
    const programSubscriptionPlan = await this.findOne(id);
    programSubscriptionPlan.active = false;
    await this.repository.save(programSubscriptionPlan);
  }

  async activate(id: number): Promise<void> {
    const programSubscriptionPlan = await this.findOne(id);
    programSubscriptionPlan.active = true;
    await this.repository.save(programSubscriptionPlan);
  }

  async remove(id: number): Promise<void> {
    const programSubscriptionPlan = await this.findOne(id);
    await this.repository.remove(programSubscriptionPlan);
  }
}
