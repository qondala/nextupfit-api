import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProgramStepActivityStatusEnum } from "../types";

@Entity("program_step_activity_workingsession")
export class ProgramStepActivityWorkingsessionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  gymId: number;

  @Column()
  programId: number;

  @Column()
  programStepId: number;

  @Column()
  programStepActivityId: number;

  @Column()
  ownerUserId: number;

  @Column({ nullable: true })
  imagerUrl: string;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({
    type: "enum",
    enum: ProgramStepActivityStatusEnum,
    default: ProgramStepActivityStatusEnum.unpublished,
  })
  status: ProgramStepActivityStatusEnum;

  @Column({ default: 0 })
  points: number;

  @Column({ default: 0 })
  attendeesCount: number;

  @Column({ default: 0 })
  viewsCount: number;

  @Column({ type: "float", default: 0 })
  ratingsAvg: number;

  @Column({ default: 0 })
  ratingsCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
