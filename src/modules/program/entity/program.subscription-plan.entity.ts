import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";


@Entity("program_subscription_plan")
export class ProgramSubscriptionPlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
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

  @Column()
  planFeatures: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
