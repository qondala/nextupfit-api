import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Coach } from "./coach.entity";

@Entity()
export class CoachSpecialization {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coach, (coach) => coach.specializations)
  coach: Coach;

  @Column()
  specialization: string;

  @Column({ nullable: true })
  description: string;
}
