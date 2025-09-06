import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { ProgramStepActivityWorkingsessionEntity } from ".";
import { BaseNutritionEntity, BaseUnitEntity } from "@app/module/base/entity";

@Entity("program_step_activity_workingsession_nutrition")
export class ProgramStepActivityWorkingsessionNutritionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  baseNutritionId?: number;

  @Column({ type: "bigint" })
  gymId: number;

  @Column({ type: "bigint" })
  programStepId: number;

  @Column({ type: "bigint" })
  programStepActivityId: number;

  @Column({ type: "bigint" })
  ownerUserId: number;

  @Column({ type: "bigint" })
  ownerManagerId: number;

  @Column({ nullable: true })
  iconUrl?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({ nullable: true })
  illustrationUrl?: string;

  @Column({ nullable: true })
  videoUrl?: string;

  @Column({ type: "bigint", nullable: true })
  programSessionPracticeId?: number;

  @Column({ nullable: true })
  duration?: number;

  @Column({ nullable: true })
  durationUnitId?: number;

  @Column({ nullable: true })
  position?: number;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ default: 0 })
  ratingsCount: number;

  @Column({ default: 0 })
  attendeesCount: number;

  @Column({ default: 0 })
  viewsCount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  ratingsAvg: number;

  @Column({ default: 0 })
  price: number;
  
  @Column({ type: "bigint", default: 0 })
  points: number;

  @Column({ nullable: true })
  title?: string;

  @ManyToOne(
    () => ProgramStepActivityWorkingsessionEntity,
    (workingsession) => workingsession.nutritions,
  )
  @JoinColumn({ name: "programStepActivityId", referencedColumnName: "id" })
  workingsession: ProgramStepActivityWorkingsessionEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseNutritionEntity)
  @JoinColumn({ name: "baseNutritionId", referencedColumnName: "id" })
  baseNutrition?: BaseNutritionEntity;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "durationUnitId", referencedColumnName: "id" })
  durationUnit: BaseUnitEntity;
}
