import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from "typeorm";
import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";
import { ContentEntity } from "@app/module/content/entity";
import { ProgramEntity } from "./program.entity";

@Entity("program_subscription_plan")
export class ProgramSubscriptionPlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  planName: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ default: 0 })
  trialNumberDays: number;

  @Column({
    type: "enum",
    enum: BaseSubscriptionPlanPeriodicityEnum,
    default: BaseSubscriptionPlanPeriodicityEnum.monthly,
  })
  periodity: BaseSubscriptionPlanPeriodicityEnum;

  @Column({ nullable: true })
  description: string;

  @Column({ type: "timestamp", nullable: true })
  trialEndDate: Date;

  @Column({ default: 0 })
  trialNumberProgramActivities: number;

  @Column({ nullable: false })
  programId: number;

  @Column({ nullable: false })
  contentId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ContentEntity)
  @JoinColumn({ name: 'contentId' })
  content: ContentEntity;

  @ManyToOne(() => ProgramEntity)
  @JoinColumn({ name: 'programId' })
  program: ProgramEntity;
}
