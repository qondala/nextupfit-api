import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import {
  PaymentCreditCardBrandEnum,
  PaymentCreditCardTypeEnum,
} from "../types";


@Entity("payment_credit_card")
export class PaymentCreditCardEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "bigint", nullable: false })
  userId: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  holderName: string;

  @Column({ 
    type: "enum",
    enum: PaymentCreditCardBrandEnum,
    enumName: "payment_credit_card_brand_enum",
    nullable: false 
  })
  brand: PaymentCreditCardBrandEnum;

  @Column({ 
    type: 'enum',
    enum: PaymentCreditCardTypeEnum,
    enumName: 'payment_credit_card_type_enum',
    nullable: false 
  })
  type: PaymentCreditCardTypeEnum;

  @Column({ type: 'varchar', length: 4, nullable: false })
  last4: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  expMonth: string;

  @Column({ type: 'varchar', length: 4, nullable: false })
  expYear: string;

  @Column({ type: 'text', nullable: true })
  paymentToken?: string;

  @Column({ type: 'text', nullable: true })
  billingAddressId?: string;

  @Column({ type: 'text', nullable: true })
  fingerprint?: string;

  @Column({ type: 'text', nullable: false })
  networkToken: string;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}
