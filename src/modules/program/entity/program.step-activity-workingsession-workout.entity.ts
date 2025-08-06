import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseWorkoutTypeEnum } from "@app/module/base/types";

import { ProgramStepActivityStatusEnum } from "../types";
import { ProgramStepActivityWorkingsessionEntity } from ".";

@Entity("program_step_activity_workingsession_workout")
export class ProgramStepActivityWorkingsessionWorkoutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  workingSessionId: number;

  @Column()
  baseWorkoutId: number;

  @Column()
  title: string;

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

  @Column()
  ownerManagerId: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  illustrationUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

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

  @Column({ default: 0 })
  difficultyLevel: number;

  @Column({ default: 0 })
  position: number;

  @Column({
    type: "enum",
    enum: BaseWorkoutTypeEnum,
    nullable: true,
  })
  workoutType?: BaseWorkoutTypeEnum;

  @ManyToOne(
    () => ProgramStepActivityWorkingsessionEntity,
    (workingsession) => workingsession.workouts,
  )
  @JoinColumn({ name: "workingSessionId", referencedColumnName: "id" })
  workingsession: ProgramStepActivityWorkingsessionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
