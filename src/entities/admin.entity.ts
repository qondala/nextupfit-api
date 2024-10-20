import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { CoachTransfer } from "./coach-transfer.entity";
import { AdminTransfer } from "./admin-transfer.entity";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "employee" })
  type: "super" | "employee";

  @OneToOne(() => User, (user) => user.coach, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => AdminTransfer, (transfer) => transfer.admin)
  transfers: CoachTransfer[];

  @OneToOne(() => User, (user) => user.coach, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @OneToOne(() => Admin, (user) => user.createBy, {
    nullable: true,
  })
  @JoinColumn()
  createBy?: Admin;
}
