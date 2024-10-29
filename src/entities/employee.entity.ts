import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Admin } from "./admin.entity";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.coach, {
    cascade: true,
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn()
  user: User;

  @OneToOne(() => Admin, (user) => user.employees, {
    cascade: true,
    onDelete: "CASCADE",
    nullable: true,
    eager: true,
  })
  @JoinColumn()
  createBy?: Admin;
}
