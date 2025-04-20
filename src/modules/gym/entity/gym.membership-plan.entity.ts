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
import { GymEntity, GymMembershipPlanFeaturesEntity } from "./";

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

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym: GymEntity;

  @OneToMany(() => GymMembershipPlanFeaturesEntity, feature => feature.membershipPlan)
  features: GymMembershipPlanFeaturesEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
