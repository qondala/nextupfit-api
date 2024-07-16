import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSubscriptionPlanDto } from "./dto/create-subscriptionplan.dto";
import { SubscriptionPlan } from "../../entities/subscription-plan.entity";
import { UpdateSubscriptionPlanDto } from "./dto/uptade-subscriptionplan.dto";

@Injectable()
export class SubscriptionPlansService {
  constructor(
    @InjectRepository(SubscriptionPlan)
    private subscriptionPlansRepository: Repository<SubscriptionPlan>,
  ) {}

  async create(
    createSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlan> {
    const subscriptionPlan = this.subscriptionPlansRepository.create(
      createSubscriptionPlanDto,
    );
    return this.subscriptionPlansRepository.save(subscriptionPlan);
  }

  async findAll(): Promise<SubscriptionPlan[]> {
    return this.subscriptionPlansRepository.find({
      relations: ["userSubscriptions"],
    });
  }

  async findOne(id: number): Promise<SubscriptionPlan> {
    const subscriptionPlan = await this.subscriptionPlansRepository.findOne({
      where: { id },
      relations: ["userSubscriptions"],
    });
    if (!subscriptionPlan) {
      throw new NotFoundException(`Subscription plan with ID ${id} not found`);
    }
    return subscriptionPlan;
  }

  async update(
    id: number,
    updateSubscriptionPlanDto: UpdateSubscriptionPlanDto,
  ): Promise<SubscriptionPlan> {
    const subscriptionPlan = await this.subscriptionPlansRepository.preload({
      id,
      ...updateSubscriptionPlanDto,
    });
    if (!subscriptionPlan) {
      throw new NotFoundException(`Subscription plan with ID ${id} not found`);
    }
    return this.subscriptionPlansRepository.save(subscriptionPlan);
  }

  async remove(id: number): Promise<void> {
    const subscriptionPlan = await this.subscriptionPlansRepository.findOne({
      where: { id },
    });
    if (!subscriptionPlan) {
      throw new NotFoundException(`Subscription plan with ID ${id} not found`);
    }
    await this.subscriptionPlansRepository.delete(id);
  }

  async searchSubscriptionPlans(query: string): Promise<SubscriptionPlan[]> {
    const subscriptionPlans = await this.subscriptionPlansRepository.find({
      where: [{ planName: `%${query}%` }],
      relations: ["userSubscriptions"],
    });
    return subscriptionPlans;
  }
}
