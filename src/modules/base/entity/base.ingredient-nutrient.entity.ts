import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseIngredientEntity, BaseNutrientEntity, BaseUnitEntity } from ".";

@Entity("base_ingredient_nutrient")
export class BaseIngredientNutrientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer", nullable: false })
  ingredientId: number;

  @Column({ type: "decimal", nullable: true })
  ingredientQty: number;

  @Column({ type: "integer", nullable: false })
  ingredientQtyUnitId: number;

  @Column({ type: "integer", nullable: false })
  nutrientId: number;

  @Column({ type: "decimal", nullable: false })
  nutrientQty: number;

  @Column({ type: "integer", nullable: false })
  nutrientQtyUnitId: number;

  @Column({ type: "integer", nullable: false })
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

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "ingredientQtyUnitId", referencedColumnName: "id" })
  ingredientQtyUnit: BaseUnitEntity;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "nutrientQtyUnitId", referencedColumnName: "id" })
  nutrientQtyUnit: BaseUnitEntity;
}
