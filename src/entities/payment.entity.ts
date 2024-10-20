import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./user.entity";
import { Content } from "./content.entity";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn()
  user: User;

  @ManyToMany(() => Content, (content) => content.payments)
  @JoinTable()
  contents: Content[];

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amountPaid: number;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  paymentDate: Date;

  @Column({ nullable: true })
  paymentMethod: string;

  @Column()
  currency: string;

  @Column()
  secret: string;

  @Column()
  intentId: string;
}
