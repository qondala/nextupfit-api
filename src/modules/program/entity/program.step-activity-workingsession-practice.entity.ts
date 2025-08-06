import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import {
  ProgramStepActivityWorkingsessionEntity,
  ProgramStepActivityWorkingsessionNutritionEntity,
  ProgramStepActivityWorkingsessionWorkoutEntity,
} from ".";

@Entity("program_step_activity_workingsession_practice")
export class ProgramStepActivityWorkingsessionPracticeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", nullable: true })
  gymId?: number;

  @Column({ type: "bigint", nullable: true })
  programId?: number;

  @Column({ type: "bigint", nullable: true })
  programStepId?: number;

  @Column({ type: "bigint", nullable: true })
  programStepActivityId?: number;

  @Column({ type: "bigint", nullable: true })
  ownerUserId?: number;

  @Column({ type: "bigint", nullable: true })
  ownerManagerId?: number;

  @Column({ type: "bigint", nullable: true })
  workingSessionId?: number;

  @Column({ type: "bigint", nullable: true })
  programWorkoutId?: number;

  @Column({ type: "bigint", nullable: true })
  programNutritionId?: number;

  @Column({ type: "bigint", nullable: true })
  position?: number;

  @ManyToOne(
    () => ProgramStepActivityWorkingsessionEntity,
    (workingsession) => workingsession.practices,
  )
  @JoinColumn({ name: "workingSessionId", referencedColumnName: "id" })
  workingsession?: ProgramStepActivityWorkingsessionEntity;

  @OneToOne(() => ProgramStepActivityWorkingsessionWorkoutEntity)
  @JoinColumn({ name: "programWorkoutId", referencedColumnName: "id" })
  workout?: ProgramStepActivityWorkingsessionWorkoutEntity;

  @OneToOne(() => ProgramStepActivityWorkingsessionNutritionEntity)
  @JoinColumn({ name: "programNutritionId", referencedColumnName: "id" })
  nutrition?: ProgramStepActivityWorkingsessionNutritionEntity;

  @CreateDateColumn()
  createdAt: Date;
}
