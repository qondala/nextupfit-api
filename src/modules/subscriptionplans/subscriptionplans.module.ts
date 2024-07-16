import { Module } from "@nestjs/common";
import { SubscriptionPlansService } from "./subscriptionplans.service";
import { SubscriptionPlansController } from "./subscriptionplans.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionPlan } from "../../entities/subscription-plan.entity";
import { UserSubscription } from "../../entities/user-subscription.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlan, UserSubscription])],
  controllers: [SubscriptionPlansController],
  providers: [SubscriptionPlansService],
  exports: [SubscriptionPlansService],
})
export class SubscriptionPlansModule {}
