import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {
  BaseSubscriptionPlanItemEnum,
  BaseSubscriptionPlanStatusEnum
} from "@app/module/base/types";
import { UserEntity } from "./user.entity";


@Entity("user_subscription_plan")
export class UserSubscriptionPlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: BaseSubscriptionPlanItemEnum,
  })
  itemType: BaseSubscriptionPlanItemEnum;

  @Column()
  itemId: number;

  @Column()
  userId: number;

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

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
