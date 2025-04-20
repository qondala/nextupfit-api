import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseSubscriptionPlanItemEnum, BaseSubscriptionPlanStatusEnum } from "@app/module/base/types";


@Entity("user_subscription_plan")
export class UserSubscriptionPlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: BaseSubscriptionPlanItemEnum,
  })
  item: BaseSubscriptionPlanItemEnum;

  @Column()
  itemId: number;

  @Column({
    type: "enum",
    enum: BaseSubscriptionPlanStatusEnum,
    default: BaseSubscriptionPlanStatusEnum.active,
  })
  status: BaseSubscriptionPlanStatusEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
