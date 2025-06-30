import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProgramStepActivityStatusEnum } from "../types";
import { ProgramStepActivityWorkingsessionEntity } from "./program.step-activity-workingsession.entity";


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

  @ManyToOne(() => ProgramStepActivityWorkingsessionEntity, workingsession => workingsession.workouts)
  @JoinColumn({ name: 'workingSessionId' })
  workingsession: ProgramStepActivityWorkingsessionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
