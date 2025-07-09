import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import {
  PaymentPayableItemEnum,
  PaymentStatusEnum,
} from "../types";
import { BaseSubscriptionPlanItemEnum } from "../../base/types";

@Entity("payment_cart")
export class PaymentCartEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "bigint" })
  userId: number;

  @Column({ type: "enum", enum: PaymentPayableItemEnum })
  itemType: PaymentPayableItemEnum;

  @Column({ type: "bigint" })
  itemId: number;

  @Column({ type: "bigint", nullable: true })
  currencyId?: number;

  @Column({ type: "enum", enum: BaseSubscriptionPlanItemEnum, nullable: true })
  subscriptionType?: BaseSubscriptionPlanItemEnum;

  @Column({ type: "bigint", nullable: true })
  subscriptionPlanId?: number;

  @Column({
    type: "enum",
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.triggered,
  })
  status: PaymentStatusEnum;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}
