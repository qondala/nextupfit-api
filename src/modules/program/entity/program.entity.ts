import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { GymEntity } from "@app/module/gym/entity";

import { ProgramStatusEnum, ProgramTypeEnum } from "../types";
import { ProgramStepEntity, ProgramSubscriptionPlanEntity } from ".";


@Entity("program")
export class ProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  gymId?: number;

  @Column({ nullable: false })
  ownerUserId: number;


  @Column({
    enum: ProgramTypeEnum,
    enumName: "ProgramTypeEnum",
    default: ProgramTypeEnum.nutrition,
    nullable: false
  })
  type: ProgramTypeEnum;


  @Column({
    enum: ProgramStatusEnum,
    enumName: "ProgramStatusEnum",
    default: ProgramStatusEnum.unpublished,
    nullable: false
  })
  status: ProgramStatusEnum;


  @Column({ nullable: true })
  iconUrl: string;


  @Column({ nullable: true })
  coverUrl: string;


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


  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym?: GymEntity;


  @OneToMany(() => ProgramStepEntity, step => step.program)
  steps: ProgramStepEntity[];


  @OneToMany(() => ProgramSubscriptionPlanEntity, plan => plan.program)
  subscriptionPlans: ProgramSubscriptionPlanEntity[];


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
