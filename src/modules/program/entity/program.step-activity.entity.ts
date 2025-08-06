import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from "typeorm";

import {
  ProgramStepActivityStatusEnum,
  ProgramVisibilityEnum,
  ProgramAccessibilityEnum,
} from "../types";
import { ProgramStepEntity, ProgramStepActivityWorkingsessionEntity } from ".";

// Transformer to convert between string[] and number[]
const BigintArrayTransformer: ValueTransformer = {
  to: (value: number[]) => value, // JS numbers → stored as PostgreSQL bigint
  from: (value: string[]) => value.map((v) => Number(v)), // PostgreSQL bigint[] → JS number[]
};

@Entity("program_step_activity")
export class ProgramStepActivityEntity {
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
  ownerUserId: number;

  @Column()
  ownerManagerId: number;

  @Column({ nullable: true })
  iconUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

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

  @Column({ default: 2 })
  duration: number;

  @Column({ default: 16 })
  durationUnitId: number;

  @Column({ default: 0 })
  difficultyLevel: number;

  @Column({ default: 0 })
  position: number;

  @Column({ default: false })
  isFreeTool: boolean;

  @Column({ default: 0 })
  price: number;

  @Column({ default: false })
  isChallenge: boolean;

  @Column({
    enum: ProgramAccessibilityEnum,
    enumName: "ProgramAccessibilityEnum",
    default: ProgramAccessibilityEnum.public,
    nullable: false,
  })
  accessibility: ProgramAccessibilityEnum;

  @Column({
    enum: ProgramVisibilityEnum,
    enumName: "ProgramVisibilityEnum",
    nullable: false,
  })
  visibility: ProgramVisibilityEnum;

  @Column({
    type: "bigint",
    array: true,
    nullable: true,
    transformer: BigintArrayTransformer,
  })
  authorizedMembershipPlanIds?: number[];

  @Column({
    type: "bigint",
    array: true,
    nullable: true,
    transformer: BigintArrayTransformer,
  })
  authorizedProgramSubscriptionPlanIds?: number[];

  @ManyToOne(() => ProgramStepEntity, (step) => step.activities)
  @JoinColumn({ name: "programStepId" })
  step: ProgramStepEntity;

  @OneToMany(
    () => ProgramStepActivityWorkingsessionEntity,
    (workingssession) => workingssession.activity,
  )
  workingssessions: ProgramStepActivityWorkingsessionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
