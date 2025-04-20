import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { PaginationOptionsDto } from "@app/common/dto";
import { UserSubscriptionPlanEntity } from "../entity";
import { CreateUserSubscriptionPlanDto, UpdateUserSubscriptionPlanDto } from "../dto";



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

  async findAll(options: PaginationOptionsDto): Promise<[UserSubscriptionPlanEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.userSubscriptionPlanRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
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

  async findByItemId(itemId: number, options: PaginationOptionsDto): Promise<[UserSubscriptionPlanEntity[], number]> {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    return await this.userSubscriptionPlanRepository.findAndCount({
      where: { itemId },
      skip,
      take: limit,
      order: {
        createdAt: "DESC",
      },
    });
  }
}
