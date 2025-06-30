import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
  OneToOne
} from "typeorm";

import { GymManagerRoleEnum } from "../types";
import {
  GymEntity,
  GymManagerOverviewEntity,
  GymManagerQualificationEntity,
  GymManagerSpecializedInWorkoutEntity
} from "./";

@Entity("gym_manager")
export class GymManagerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  gymId: number;


  @Column({ nullable: false })
  managerUserId: number;

  @Column({ nullable: false })
  managerOverviewId?: number;


  @Column({ type: "enum", enum: GymManagerRoleEnum, nullable: false })
  role: GymManagerRoleEnum;


  @Column({ nullable: true })
  dateEnrollment?: Date;


  @Column({ nullable: true })
  suspended?: boolean;

  @OneToOne(() => GymManagerOverviewEntity)
  @JoinColumn({ name: 'managerOverviewId' })
  overview?: GymManagerOverviewEntity;

  @ManyToOne(() => GymEntity, gym => gym.managers)
  @JoinColumn({ name: "gymId" })
  gym?: GymEntity;

  @OneToMany(() => GymManagerQualificationEntity, qualification => qualification.manager)
  qualifications?: GymManagerQualificationEntity[];

  @OneToMany(() => GymManagerSpecializedInWorkoutEntity, specializedWorkout => specializedWorkout.manager)
  specializedWorkouts?: GymManagerSpecializedInWorkoutEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
