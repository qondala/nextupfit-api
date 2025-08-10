import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseWorkoutEntity } from "@app/module/base/entity";

import { GymEntity } from "./gym.entity";

@Entity("gym_specialized_in_workout")
export class GymSpecializedInWorkoutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "gymId", nullable: false })
  gymId: number;

  @Column({ name: "workoutId", nullable: false })
  workoutId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseWorkoutEntity)
  @JoinColumn({ name: "workoutId", referencedColumnName: "id" })
  workout: BaseWorkoutEntity;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: "gymId", referencedColumnName: "id" })
  gym: GymEntity;
}
