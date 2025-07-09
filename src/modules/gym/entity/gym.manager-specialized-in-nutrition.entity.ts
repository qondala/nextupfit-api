import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { GymManagerEntity } from "./gym.manager.entity";
import { BaseNutritionEntity } from "@app/module/base/entity";

@Entity("gym_manager_specialized_in_nutrition")
export class GymManagerSpecializedInNutritionEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ nullable: false, type: "bigint" })
  managerId: number;

  @Column({ nullable: true, type: "int" })
  baseNutritionId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: "managerId" })
  manager: GymManagerEntity;

  @ManyToOne(() => BaseNutritionEntity)
  @JoinColumn({ name: "baseNutritionId" })
  baseNutrition: BaseNutritionEntity;
}
