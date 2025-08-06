import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseIngredientEntity, BaseNutrientEntity } from ".";

@Entity("base_ingredient_nutrient")
export class BaseIngredientNutrientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  ingredientId: number;

  @Column({ type: "int", nullable: true })
  ingredientQty: number;

  @Column({ type: "int", nullable: false })
  ingredientQtyUnitId: number;

  @Column({ type: "int", nullable: false })
  nutrientId: number;

  @Column({ type: "int", nullable: false })
  nutrientQty: number;

  @Column({ type: "int", nullable: false })
  nutrientQtyUnitId: number;

  @Column({ type: "int", nullable: false })
  createdByUserId: number;

  @OneToOne(() => BaseIngredientEntity)
  @JoinColumn({ name: "ingredientId", referencedColumnName: "id" })
  ingredient: BaseIngredientEntity;

  @OneToOne(() => BaseNutrientEntity)
  @JoinColumn({ name: "nutrientId", referencedColumnName: "id" })
  nutrient: BaseNutrientEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
