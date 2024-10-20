import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Coach } from "./coach.entity";

@Entity()
export class CoachQualification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coach, (coach) => coach.qualifications)
  @JoinColumn()
  coach: Coach;

  @Column()
  qualificationName: string;

  @Column({ nullable: true })
  institutionName: string;

  @Column({ nullable: true })
  yearObtained: number;

  @Column({ nullable: true })
  imageUrl?: string;
}
