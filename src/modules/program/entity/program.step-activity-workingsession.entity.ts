import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProgramStepActivityStatusEnum } from "../types";
import { ProgramStepActivityEntity } from "./program.step-activity.entity";
import { ProgramStepActivityWorkingsessionWorkoutEntity } from "./program.step-activity-workingsession-workout.entity";

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
  imageUrl: string;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({
    enumName: "ProgramStepActivityStatusEnum",
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

  @Column({ default: 0 })
  duration: number;

  @Column({ default: 0 })
  durationUnitId: number;

  @Column({ default: 0 })
  price: number;


  @ManyToOne(() => ProgramStepActivityEntity, activity => activity.workingssessions)
  @JoinColumn({ name: 'programStepActivityId' })
  activity: ProgramStepActivityEntity;

  @OneToMany(() => ProgramStepActivityWorkingsessionWorkoutEntity, workout => workout.workingsession)
  workouts: ProgramStepActivityWorkingsessionWorkoutEntity[]; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
