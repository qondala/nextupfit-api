import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginatedResponseDto, PaginationOptionsDto } from "@app/common/dto";
import { UserSubscriptionPlanEntity } from "../entity";
import { CreateUserSubscriptionPlanDto, UpdateUserSubscriptionPlanDto } from "../dto";
import { BaseSubscriptionPlanItemEnum } from "@app/module/base/types";



@Injectable()
export class UserSubscriptionPlanService {
  constructor(
    @InjectRepository(UserSubscriptionPlanEntity)
    private readonly userSubscriptionPlanRepository: Repository<UserSubscriptionPlanEntity>
  ) {}

  async create(createUserSubscriptionPlanDto: CreateUserSubscriptionPlanDto): Promise<UserSubscriptionPlanEntity> {
    const userSubscriptionPlan = this.userSubscriptionPlanRepository.create(createUserSubscriptionPlanDto);
    return await this.userSubscriptionPlanRepository.save(userSubscriptionPlan);
  }

  async findAll(userId: number, options: PaginationOptionsDto): Promise<PaginatedResponseDto<UserSubscriptionPlanEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userSubscriptionPlanRepository.findAndCount({
      where: { userId },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: number): Promise<UserSubscriptionPlanEntity> {
    const userSubscriptionPlan = await this.userSubscriptionPlanRepository.findOne({ where: { id } });
    if (!userSubscriptionPlan) {
      throw new Error(`User subscription plan with ID ${id} not found`);
    }
    return userSubscriptionPlan;
  }

  async update(id: number, updateUserSubscriptionPlanDto: UpdateUserSubscriptionPlanDto): Promise<UserSubscriptionPlanEntity> {
    const userSubscriptionPlan = await this.findOne(id);
    Object.assign(userSubscriptionPlan, updateUserSubscriptionPlanDto);
    return await this.userSubscriptionPlanRepository.save(userSubscriptionPlan);
  }

  async remove(id: number): Promise<void> {
    const userSubscriptionPlan = await this.findOne(id);
    await this.userSubscriptionPlanRepository.remove(userSubscriptionPlan);
  }

  async findByItemType(
    userId: number,
    itemType: BaseSubscriptionPlanItemEnum,
    options: PaginationOptionsDto
  ): Promise<PaginatedResponseDto<UserSubscriptionPlanEntity>> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const [items, total] = await this.userSubscriptionPlanRepository.findAndCount({
      where: { userId, itemType },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });

    return {
      items,
      meta: {
        totalItems: total,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  }
}
