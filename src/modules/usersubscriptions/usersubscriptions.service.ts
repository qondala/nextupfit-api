import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserSubscriptionDto } from "./dto/create-usersubscription.dto";
import { UpdateUserSubscriptionDto } from "./dto/update-usersubscription.dto";
import { UserSubscription } from "../../entities/user-subscription.entity";

@Injectable()
export class UserSubscriptionsService {
  constructor(
    @InjectRepository(UserSubscription)
    private userSubscriptionsRepository: Repository<UserSubscription>,
  ) {}

  async create(
    createUserSubscriptionDto: CreateUserSubscriptionDto,
    userId: number,
  ): Promise<UserSubscription> {
    const userSubscription = this.userSubscriptionsRepository.create({
      ...createUserSubscriptionDto,
      user: { id: userId },
      subscriptionPlan: { id: createUserSubscriptionDto.planId },
    });
    return this.userSubscriptionsRepository.save(userSubscription);
  }

  async findAll(): Promise<UserSubscription[]> {
    return this.userSubscriptionsRepository.find({
      relations: ["user", "plan"],
    });
  }

  async findOne(id: number): Promise<UserSubscription> {
    const userSubscription = await this.userSubscriptionsRepository.findOne({
      where: { id },
      relations: ["user", "plan"],
    });
    if (!userSubscription) {
      throw new NotFoundException(`User subscription with ID ${id} not found`);
    }
    return userSubscription;
  }

  async update(
    id: number,
    updateUserSubscriptionDto: UpdateUserSubscriptionDto,
    userId: number,
  ): Promise<UserSubscription> {
    const userSubscription = await this.userSubscriptionsRepository.preload({
      id,
      ...updateUserSubscriptionDto,
    });
    if (!userSubscription) {
      throw new NotFoundException(`User subscription with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à modifier son abonnement
    if (userSubscription.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to update this user subscription",
      );
    }
    return this.userSubscriptionsRepository.save(userSubscription);
  }

  async remove(id: number, userId: number): Promise<void> {
    const userSubscription = await this.userSubscriptionsRepository.findOne({
      where: { id },
    });
    if (!userSubscription) {
      throw new NotFoundException(`User subscription with ID ${id} not found`);
    }
    // Vérifier que l'utilisateur est autorisé à supprimer son abonnement
    if (userSubscription.user.id !== userId) {
      throw new UnauthorizedException(
        "You are not authorized to delete this user subscription",
      );
    }
    await this.userSubscriptionsRepository.delete(id);
  }

  async searchUserSubscriptions(query: string): Promise<UserSubscription[]> {
    const userSubscriptions = await this.userSubscriptionsRepository.find({
      where: [
        { user: { firstName: `%${query}%` } },
        { user: { lastName: `%${query}%` } },
        { user: { email: `%${query}%` } },
        { subscriptionPlan: { planName: `%${query}%` } },
      ],
      relations: ["user", "plan"],
    });
    return userSubscriptions;
  }

  async findByUser(userId: number): Promise<UserSubscription[]> {
    const userSubscriptions = await this.userSubscriptionsRepository.find({
      where: { user: { id: userId } },
      relations: ["user", "plan"],
    });
    if (!userSubscriptions) {
      throw new NotFoundException(
        `User subscriptions for user ${userId} not found`,
      );
    }
    return userSubscriptions;
  }

  async findByPlan(planId: number): Promise<UserSubscription[]> {
    const userSubscriptions = await this.userSubscriptionsRepository.find({
      where: { subscriptionPlan: { id: planId } },
      relations: ["user", "plan"],
    });
    if (!userSubscriptions) {
      throw new NotFoundException(
        `User subscriptions for plan ${planId} not found`,
      );
    }
    return userSubscriptions;
  }
}
