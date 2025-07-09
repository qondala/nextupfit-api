import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";

import { BaseWorkoutEntity } from "@app/module/base/entity";
import { GymManagerEntity } from "./";


@Entity("gym_manager_specialized_in_workout")
export class GymManagerSpecializedInWorkoutEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  managerId: number;

  @Column({ nullable: false })
  baseWorkoutId: number;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: 'managerId' })
  manager: GymManagerEntity;

  @ManyToOne(() => BaseWorkoutEntity)
  @JoinColumn({ name: 'baseWorkoutId' })
  baseWorkout: BaseWorkoutEntity;
}
