import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { PaymentStatusEnum, PaymentMethodEnum } from "../types";

@Entity("payment_transfer")
export class PaymentTransferEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "bigint" })
  senderUserId: number;

  @Column({ type: "bigint", nullable: true })
  senderManagerId?: number;

  @Column({ type: "bigint", nullable: true })
  senderGymId?: number;

  @Column({ type: "bigint" })
  receiverUserId: number;

  @Column({ type: "bigint", nullable: true })
  receiverManagerId?: number;

  @Column({ type: "bigint", nullable: true })
  receiverGymId?: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: "enum",
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.triggered,
  })
  status: PaymentStatusEnum;

  @Column({ type: "varchar" })
  stripeTransferId: string;

  @Column({ type: "timestamp", default: () => "now()" })
  operationDate: Date;

  @Column({ type: "timestamp", nullable: true })
  completionDate?: Date;

  @Column({ type: "text", nullable: true })
  message?: string;

  @Column({ type: "enum", enum: PaymentMethodEnum, nullable: true })
  paymentMethod?: PaymentMethodEnum;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}
