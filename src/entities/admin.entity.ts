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
import { Coach } from "./coach.entity";

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

  @OneToOne(() => Coach, (coach) => coach.admin)
  @JoinColumn()
  coach: Coach;

  @OneToMany(() => Coach, (coach) => coach.manager)
  employees: Coach[];

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
