import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";

import { GymManagerSpecialityEnum } from "../types";
import {
  GymManagerOverviewEntity,
  GymManagerQualificationEntity,
  GymManagerSpecializedInNutritionEntity,
  GymManagerSpecializedInWorkoutEntity,
} from "./";
import { UserEntity } from "@app/module/user/entity";
import { GymManagerInterestEntity } from "./gym.manager-interest.entity";

@Entity("gym_manager")
export class GymManagerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  managerUserId: number;

  @Column({ nullable: false })
  managerOverviewId: number;

  @Column({
    nullable: false,
    type: "enum",
    enum: GymManagerSpecialityEnum,
  })
  speciality: GymManagerSpecialityEnum;

  @Column({ nullable: true, default: 0 })
  viewsCount: number;

  @Column({ nullable: true, default: 0 })
  attendeesCount: number;

  @Column({ nullable: true, default: 0.0 })
  ratingsAvg: number;

  @Column({ nullable: true, default: 0 })
  followersCount: number;

  @Column({ nullable: true, default: 0 })
  ratingsCount: number;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  gender: number;

  @Column({ nullable: true })
  yearsOfExperience: number;

  @Column({ type: "boolean", nullable: true })
  certified: boolean;

  @Column({ type: "boolean", nullable: true })
  verified: boolean;

  @Column({ nullable: true })
  level: number;

  @OneToOne(() => GymManagerOverviewEntity)
  @JoinColumn({ name: "managerOverviewId", referencedColumnName: "id" })
  overview: GymManagerOverviewEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: "managerUserId", referencedColumnName: "id" })
  user: UserEntity;

  @OneToMany(
    () => GymManagerQualificationEntity,
    (qualification) => qualification.manager,
  )
  qualifications: GymManagerQualificationEntity[];

  @OneToMany(
    () => GymManagerSpecializedInWorkoutEntity,
    (specializedWorkout) => specializedWorkout.manager,
  )
  specializedWorkouts: GymManagerSpecializedInWorkoutEntity[];

  @OneToMany(
    () => GymManagerSpecializedInNutritionEntity,
    (specializedNutrition) => specializedNutrition.manager,
  )
  specializedNutritions: GymManagerSpecializedInNutritionEntity[];

  @OneToMany(() => GymManagerInterestEntity, (interest) => interest.manager)
  interests: GymManagerInterestEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
