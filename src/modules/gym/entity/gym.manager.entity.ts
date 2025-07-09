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

import { GymManagerRoleEnum, GymManagerSpecialityEnum } from "../types";
import {
  GymEntity,
  GymManagerOverviewEntity,
  GymManagerQualificationEntity,
  GymManagerSpecializedInNutritionEntity,
  GymManagerSpecializedInWorkoutEntity
} from "./";
import { UserEntity } from "@app/module/user/entity";

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


  @Column({ 
    type: "enum", 
    enum: GymManagerRoleEnum, 
    nullable: false 
  })
  role: GymManagerRoleEnum;


  @Column({ nullable: true })
  dateEnrollment?: Date;


  @Column({ nullable: true })
  suspended?: boolean;

  @Column({
    nullable: false,
    type: "enum",
    enum: GymManagerSpecialityEnum
  })
  speciality: GymManagerSpecialityEnum;

  @OneToOne(() => GymManagerOverviewEntity)
  @JoinColumn({ name: 'managerOverviewId' })
  overview?: GymManagerOverviewEntity;

  @ManyToOne(() => GymEntity, gym => gym.managers)
  @JoinColumn({ name: "gymId" })
  gym?: GymEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'managerUserId' })
  user: UserEntity;

  @OneToMany(() => GymManagerQualificationEntity, qualification => qualification.manager)
  qualifications?: GymManagerQualificationEntity[];

  @OneToMany(() => GymManagerSpecializedInWorkoutEntity, specializedWorkout => specializedWorkout.manager)
  specializedWorkouts?: GymManagerSpecializedInWorkoutEntity[];

  @OneToMany(() => GymManagerSpecializedInNutritionEntity, specializedNutrition => specializedNutrition.manager)
  specializedNutritions?: GymManagerSpecializedInNutritionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
