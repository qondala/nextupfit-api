import { Column, CreateDateColumn, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseNutritionTypeEntity } from "./base.nutrition-type.entity";

@Entity("base_nutrition")
export class BaseNutritionEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;

  @Column({ type: "int", nullable: false })
  baseNutritionTypeId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseNutritionTypeEntity, (nutritionType) => nutritionType.nutritions)
  @JoinColumn({ name: "baseNutritionTypeId" })
  nutritionType: BaseNutritionTypeEntity;
}
