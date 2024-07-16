import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { SubscriptionPlan } from "./subscription-plan.entity";

@Entity()
export class UserSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userSubscriptions)
  user: User;

  @ManyToOne(
    () => SubscriptionPlan,
    (subscriptionPlan) => subscriptionPlan.userSubscriptions,
  )
  subscriptionPlan: SubscriptionPlan;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  startDate: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  endDate: Date;
}
