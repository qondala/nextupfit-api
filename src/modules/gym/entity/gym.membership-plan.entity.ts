import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from "typeorm";

import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";
import { GymEntity } from "./";
import { ContentEntity } from "@app/module/content/entity";

@Entity("gym_membership_plan")
export class GymMembershipPlanEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  gymId: number;


  @Column({ nullable: false })
  planName: string;


  @Column({ nullable: true })
  price: number;


  @Column({ nullable: true })
  trialNumberDays?: number;


  @Column({
    type: "enum",
    enum: BaseSubscriptionPlanPeriodicityEnum
  })
  periodicity: BaseSubscriptionPlanPeriodicityEnum;


  @Column({ nullable: true })
  description: string;


  @Column({ nullable: true })
  trialNumberProgramActivities: number;


  @Column({ nullable: true })
  contentId: number;


  @ManyToOne(() => ContentEntity)
  @JoinColumn({ name: 'contentId' })
  content: ContentEntity;


  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym: GymEntity;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
