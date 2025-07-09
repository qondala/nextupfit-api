import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { GymEntity } from "./gym.entity";
import { BaseNutritionEntity } from "@app/module/base/entity";

@Entity("gym_specialized_in_nutrition")
export class GymSpecializedInNutritionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "gymId" })
  gymId: number;

  @Column({ name: "nutritionId" })
  nutritionId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseNutritionEntity)
  @JoinColumn({ name: "nutritionId" })
  nutrition: BaseNutritionEntity;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: "gymId" })
  gym: GymEntity;
}
