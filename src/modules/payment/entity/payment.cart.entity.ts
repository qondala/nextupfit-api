import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

import { PaymentStatusEnum } from "../types";
import { PaymentCartItemEntity } from ".";

@Entity("payment_cart")
export class PaymentCartEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "bigint" })
  userId: number;

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

  @OneToMany(() => PaymentCartItemEntity, (item) => item.paymentCart)
  items: PaymentCartItemEntity[];
}
