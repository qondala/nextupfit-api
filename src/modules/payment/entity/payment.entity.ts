import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

import { PaymentPayableItemEnum, PaymentStatusEnum } from "../types";


@Entity("payment")
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal", { precision: 10, scale: 2 })
  amountPaid: number;

  @Column()
  currency: string;

  @Column({ type: "timestamp", nullable: true })
  paymentDate?: Date;

  @Column()
  paymentMethod: string;

  @Column()
  secret: string;

  @Column()
  userId: number;

  @Column({
    type: "enum",
    enum: PaymentPayableItemEnum,
  })
  item: PaymentPayableItemEnum;

  @Column()
  itemId: number;

  @Column({
    type: "enum",
    enum: PaymentStatusEnum,
  })
  status: PaymentStatusEnum;

  @CreateDateColumn()
  createdAt: Date;
}
