import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Coach } from "./coach.entity";

@Entity()
export class CoachQualification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coach, (coach) => coach.qualifications)
  coach: Coach;

  @Column()
  qualificationName: string;

  @Column({ nullable: true })
  institutionName: string;

  @Column({ nullable: true })
  yearObtained: number;
}
