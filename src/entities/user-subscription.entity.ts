import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { SubscriptionPlan } from "./subscription-plan.entity";

@Entity()
export class UserSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userSubscriptions)
  @JoinColumn()
  user: User;

  @ManyToOne(
    () => SubscriptionPlan,
    (subscriptionPlan) => subscriptionPlan.userSubscriptions,
  )
  @JoinColumn()
  subscriptionPlan: SubscriptionPlan;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  startDate: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  endDate: Date;
}
