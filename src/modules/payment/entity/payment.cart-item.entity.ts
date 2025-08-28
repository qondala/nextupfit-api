import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";

import { PaymentPayableItemEnum, PaymentStatusEnum } from "../types";
import { PaymentCartEntity } from ".";

@Entity("payment_cart_item")
export class PaymentCartItemEntity {
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

  @Column({ type: "bigint" })
  paymentCartId: number;

  @Column({ type: "bigint", nullable: true })
  currencyId?: number;

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

  @ManyToOne(() => PaymentCartEntity, (cart) => cart.items)
  paymentCart: PaymentCartEntity;
}
