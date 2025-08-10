import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserEntity } from "@app/module/user/entity";

import { GymMembershipStatusEnum } from "../types";

import { GymEntity, GymMembershipPlanEntity } from "./";

@Entity("gym_membership")
export class GymMembershipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  gymId: number;

  @Column({ nullable: false })
  memberUserId: number;

  @Column({ nullable: false })
  gymMembershipPlanId: number;

  @Column({ type: "timestamp", nullable: true, default: new Date() })
  startedDate?: Date;

  @Column({
    type: "enum",
    enum: GymMembershipStatusEnum,
    nullable: false,
  })
  membershipStatus: GymMembershipStatusEnum;

  @Column({ type: "boolean", nullable: true })
  isFavorite?: boolean;

  @Column({ type: "timestamp", nullable: true })
  lastStatusUpdate?: Date;

  @ManyToOne(() => GymMembershipPlanEntity)
  @JoinColumn({ name: "gymMembershipPlanId", referencedColumnName: "id" })
  membershipPlan: GymMembershipPlanEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "memberUserId", referencedColumnName: "id" })
  member: UserEntity;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: "gymId", referencedColumnName: "id" })
  gym: GymEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
