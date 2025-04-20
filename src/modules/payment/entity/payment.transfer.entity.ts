import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

import { PaymentStatusEnum } from "../types";

@Entity("payment_transfer")
export class PaymentTransferEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderUserId: number;

  @Column()
  senderGymId: number;

  @Column()
  receiverUserId: number;

  @Column("decimal", { precision: 10, scale: 2 })
  amountTransferred: number;

  @Column()
  currency: string;

  @Column({ type: "timestamp", nullable: true })
  operationDate?: Date;

  @Column()
  paymentMethod: string;

  @Column()
  secret: string;

  @Column({
    type: "enum",
    enum: PaymentStatusEnum,
  })
  status: PaymentStatusEnum;

  @CreateDateColumn()
  createdAt: Date;
}
