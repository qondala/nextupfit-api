import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { UserSubscription } from "./user-subscription.entity";

@Entity()
export class SubscriptionPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  planName: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column()
  durationDays: number;

  @Column({ nullable: true })
  durationType: string;

  @OneToMany(
    () => UserSubscription,
    (userSubscription) => userSubscription.subscriptionPlan,
  )
  userSubscriptions: UserSubscription[];
}
