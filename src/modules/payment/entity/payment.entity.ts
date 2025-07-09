import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import {
  PaymentPayableItemEnum,
  PaymentStatusEnum,
  PaymentMethodEnum,
} from "../types";
import { BaseSubscriptionPlanItemEnum } from "@app/module/base/types";

@Entity("payment")
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  amount: number;

  @Column({ type: "timestamp", default: () => "now()" })
  paymentDate: Date;

  @Column({ type: "varchar", nullable: true })
  secret?: string;

  @Column({ type: "int", nullable: false })
  userId: number;

  @Column({ type: "enum", enum: PaymentPayableItemEnum, nullable: false })
  itemType: PaymentPayableItemEnum;

  @Column({ type: "int", nullable: false })
  itemId: number;

  @Column({
    type: "enum",
    enum: PaymentStatusEnum,
    nullable: false,
    default: PaymentStatusEnum.triggered,
  })
  status: PaymentStatusEnum;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @Column({ type: "enum", enum: PaymentMethodEnum, nullable: false })
  paymentMethod: PaymentMethodEnum;

  @Column({ type: "int", nullable: true })
  currencyId?: number;

  @Column({
    type: "enum",
    enum: BaseSubscriptionPlanItemEnum,
    nullable: true,
  })
  subscriptionType?: BaseSubscriptionPlanItemEnum;

  @Column({ type: "bigint", nullable: true })
  subscriptionPlanId?: number;

  @Column({ type: "bigint", nullable: true })
  paymentCartId?: number;

  @Column({ type: "varchar", nullable: true })
  stripePaymentId?: string;

  @Column({ type: "bigint", nullable: true })
  receiverUserId?: number;

  @Column({ type: "bigint", nullable: true })
  receiverManagerId?: number;

  @Column({ type: "bigint", nullable: true })
  receiverGymId?: number;

  @Column({ type: "text", nullable: true })
  message?: string;
}
