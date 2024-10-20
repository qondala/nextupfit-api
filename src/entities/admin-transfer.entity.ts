import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Admin } from "./admin.entity";

@Entity()
export class AdminTransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Admin, (admin) => admin.transfers)
  admin: Admin;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column()
  currency: string;

  @Column()
  paymentMethod: string;

  @Column({ nullable: true })
  stripeTransferId: string; // ID du transfert Stripe

  @CreateDateColumn()
  createdAt: Date;
}
