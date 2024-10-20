import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Coach } from "./coach.entity";

@Entity()
export class CoachTransfer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coach, (coach) => coach.transfers)
  coach: Coach;

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
