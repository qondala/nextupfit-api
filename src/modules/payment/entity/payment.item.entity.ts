import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import {
  PaymentCartItemEntity,
  PaymentEntity,
} from ".";
import { PaymentStatusEnum } from "../types";


@Entity("payment_item")
export class PaymentItemEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "bigint", nullable: false })
  cartItemId: number;

  @Column({ type: "bigint", nullable: false })
  paymentId: number;

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

  @OneToOne(() => PaymentCartItemEntity)
  @JoinColumn({ name: "cartItemId", referencedColumnName: "id" })
  cartItem: PaymentCartItemEntity;

  @OneToOne(() => PaymentEntity)
  @JoinColumn({ name: "paymentId", referencedColumnName: "id" })
  payment: PaymentEntity;
}
