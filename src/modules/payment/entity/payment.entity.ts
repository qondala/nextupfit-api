import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import {
  PaymentStatusEnum,
  PaymentMethodEnum,
} from "../types";

import {
  PaymentScopeEnum,
} from "../types/payment.scope.enum";
import { PaymentCreditCardEntity } from "./payment.credit-card.entity";
import { PaymentCartEntity } from "./payment.cart.entity";
import { PaymentItemEntity } from "./payment.item.entity";

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
    enum: PaymentStatusEnum,
    nullable: false,
    default: PaymentStatusEnum.triggered,
  })
  status: PaymentStatusEnum;

  @Column({
    type: "enum",
    enum: PaymentMethodEnum,
    nullable: false,
    default: PaymentMethodEnum.stripe,
  })
  paymentMethod: PaymentMethodEnum;

  @Column({ type: "bigint", nullable: true })
  currencyId?: number;


  @Column({ type: "bigint", nullable: true })
  paymentCartId: number;

  @Column({ type: "varchar", nullable: true })
  stripePaymentId?: string;

  @Column({ type: "text", nullable: true })
  message?: string;

  @Column({
    type: "enum",
    enum: PaymentScopeEnum,
    nullable: false,
    default: PaymentScopeEnum.subscription,
  })
  paymentScope: PaymentScopeEnum;

  @Column({ type: "bigint", nullable: true })
  paymentCreditCardId: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @OneToOne(() => PaymentCreditCardEntity)
  @JoinColumn({ name: "paymentCreditCardId", referencedColumnName: "id" })
  paymentCreditCard: PaymentCreditCardEntity;

  @OneToOne(() => PaymentCartEntity)
  @JoinColumn({ name: "paymentCartId", referencedColumnName: "id" })
  paymentCart: PaymentCartEntity;

  @OneToMany(() => PaymentItemEntity, (item) => item.payment)
  items: PaymentItemEntity[];
}
