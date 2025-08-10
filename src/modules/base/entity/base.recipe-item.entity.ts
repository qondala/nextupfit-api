import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseRecipeItemTypeEnum } from "../types";
import { BaseRecipeEntity, BaseUnitEntity } from ".";

@Entity("base_recipe_item")
export class BaseRecipeItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", nullable: false })
  recipeId: number;

  @Column({ type: "enum", enum: BaseRecipeItemTypeEnum, nullable: false })
  itemType: BaseRecipeItemTypeEnum;

  @Column({ type: "bigint", nullable: true })
  itemId?: number;

  @Column({ type: "numeric", default: 1 })
  itemQuantity?: number;

  @Column({ type: "integer", nullable: true })
  itemQuantityUnitId?: number;

  @Column({ type: "integer", default: 0 })
  order?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseRecipeEntity, (recipe) => recipe.items)
  recipe: BaseRecipeEntity;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "itemQuantityUnitId", referencedColumnName: "id" })
  itemQuantityUnit?: BaseUnitEntity;
}
