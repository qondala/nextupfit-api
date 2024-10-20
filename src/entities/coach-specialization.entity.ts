import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Coach } from "./coach.entity";

@Entity()
export class CoachSpecialization {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coach, (coach) => coach.specializations)
  @JoinColumn()
  coach: Coach;

  @Column()
  specialization: string;

  @Column({ nullable: true })
  description: string;
}
