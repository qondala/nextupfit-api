import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm";
import { BaseNutritionEntity } from ".";

@Entity("base_nutrition_type")
export class BaseNutritionTypeEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: true })
  description?: string;

  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => BaseNutritionEntity, (nutrition) => nutrition.nutritionType)
  nutritions: BaseNutritionEntity[];
}
