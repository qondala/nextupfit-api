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
import { PaymentScopeEnum } from "../types/payment.scope.enum";

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

  @Column({ type: "bigint", nullable: false })
  userId: number;

  @Column({
    type: "enum",
    enum: PaymentPayableItemEnum,
    nullable: false,
    default: PaymentPayableItemEnum.membership,
  })
  itemType: PaymentPayableItemEnum;

  @Column({ type: "bigint", nullable: false })
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

  @Column({
    type: "enum",
    enum: PaymentMethodEnum,
    nullable: false,
    default: PaymentMethodEnum.stripe,
  })
  paymentMethod: PaymentMethodEnum;

  @Column({ type: "bigint", nullable: true })
  currencyId?: number;

  @Column({
    type: "enum",
    enum: BaseSubscriptionPlanItemEnum,
    nullable: true,
  })
  subscriptionType?: BaseSubscriptionPlanItemEnum;

  @Column({ type: "bigint", nullable: true })
  programSubscriptionPlanId?: number;

  @Column({ type: "bigint", nullable: true })
  gymMembershipPlanId?: number;


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

  @Column({
    type: "enum",
    enum: PaymentScopeEnum,
    nullable: false,
    default: PaymentScopeEnum.subscription,
  })
  paymentScope: PaymentScopeEnum;
}
