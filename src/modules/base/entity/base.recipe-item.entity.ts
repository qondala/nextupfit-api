import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { BaseRecipeItemTypeEnum } from "../types";

@Entity("base_recipe_item")
export class BaseRecipeItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  recipeId: number;

  @Column({ type: "enum", enum: BaseRecipeItemTypeEnum, nullable: false })
  itemType: BaseRecipeItemTypeEnum;

  @Column({ type: "int", nullable: true })
  itemId?: number;

  @Column({ type: "numeric", default: 1 })
  itemQuantity?: number;

  @Column({ type: "int", nullable: true })
  itemQuantityUnitId?: number;

  @Column({ type: "int", default: 0 })
  order?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
