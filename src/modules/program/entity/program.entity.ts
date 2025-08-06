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

import { GymEntity } from "@app/module/gym/entity";

import {
  ProgramAccessibilityEnum,
  ProgramStatusEnum,
  ProgramTypeEnum,
  ProgramVisibilityEnum,
} from "../types";
import {
  ProgramStepEntity,
  ProgramSubscriptionPlanEntity,
  ProgramInterestEntity,
} from ".";

// Transformer to convert between string[] and number[]
const BigintArrayTransformer: ValueTransformer = {
  to: (value: number[]) => value, // JS numbers → stored as PostgreSQL bigint
  from: (value: string[]) => value.map((v) => Number(v)), // PostgreSQL bigint[] → JS number[]
};

@Entity("program")
export class ProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  gymId?: number;

  @Column({ nullable: true })
  description?: string;

  @Column()
  ownerUserId: number;

  @Column()
  ownerManagerId: number;

  @Column({
    enum: ProgramTypeEnum,
    enumName: "ProgramTypeEnum",
    default: ProgramTypeEnum.nutrition,
    nullable: false,
  })
  type: ProgramTypeEnum;

  @Column({
    enum: ProgramStatusEnum,
    enumName: "ProgramStatusEnum",
    default: ProgramStatusEnum.unpublished,
    nullable: false,
  })
  status: ProgramStatusEnum;

  @Column({ nullable: true })
  iconUrl: string;

  @Column({ nullable: true })
  coverUrl: string;

  @Column({ nullable: true })
  videoUrl: string;

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

  @Column({ nullable: true })
  points?: number;

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
    default: ProgramVisibilityEnum.public,
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

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: "gymId" })
  gym?: GymEntity;

  @OneToMany(() => ProgramStepEntity, (step) => step.program)
  steps: ProgramStepEntity[];

  @OneToMany(() => ProgramSubscriptionPlanEntity, (plan) => plan.program)
  subscriptionPlans: ProgramSubscriptionPlanEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ProgramInterestEntity, (interest) => interest.program)
  interests: ProgramInterestEntity[];
}
