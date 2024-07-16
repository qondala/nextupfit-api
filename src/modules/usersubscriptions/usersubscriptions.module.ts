import { Module } from "@nestjs/common";
import { UserSubscriptionsService } from "./usersubscriptions.service";
import { UserSubscriptionsController } from "./usersubscriptions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionPlan } from "../../entities/subscription-plan.entity";
import { UserSubscription } from "../../entities/user-subscription.entity";
import { User } from "../../entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSubscription, User, SubscriptionPlan]),
  ],
  controllers: [UserSubscriptionsController],
  providers: [UserSubscriptionsService],
  exports: [UserSubscriptionsService],
})
export class UserSubscriptionsModule {}
