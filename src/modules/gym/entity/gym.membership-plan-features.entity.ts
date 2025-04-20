import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";

import { BaseHighlightColorEnum } from "@app/module/base/types";
import { GymMembershipPlanEntity } from "./";

@Entity("gym_membership_plan_features")
export class GymMembershipPlanFeaturesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gymId: number;

  @Column()
  gymMembershipPlanId: number;

  @Column("text")
  description: string;

  @Column({
    type: "enum",
    enum: BaseHighlightColorEnum,
    nullable: true
  })
  highlight?: BaseHighlightColorEnum;


  @ManyToOne(() => GymMembershipPlanEntity, plan => plan.features)
  @JoinColumn({ name: "gymMembershipPlanId" })
  membershipPlan: GymMembershipPlanEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
