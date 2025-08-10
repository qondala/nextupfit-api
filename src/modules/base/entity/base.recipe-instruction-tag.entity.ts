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
import { BaseRecipeInstructionEntity, BaseUnitEntity } from ".";

@Entity("base_recipe_instruction_tag")
export class BaseRecipeInstructionTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: BaseRecipeItemTypeEnum,
    nullable: false,
  })
  tagItemType: BaseRecipeItemTypeEnum;

  @Column({
    type: "bigint",
    nullable: false,
  })
  tagItemId: number;

  @Column({
    type: "integer",
    default: 0,
  })
  order?: number;

  @Column({
    type: "integer",
    nullable: false,
  })
  recipeInstructionId: number;

  @Column({
    type: "integer",
    default: 0,
  })
  tagQuantityUnitId?: number;

  @Column({
    type: "numeric",
    default: 1,
  })
  tagQuantity?: number;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseRecipeInstructionEntity, (instruction) => instruction.tags)
  @JoinColumn({ name: "recipeInstructionId", referencedColumnName: "id" })
  recipeInstruction: BaseRecipeInstructionEntity;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "tagQuantityUnitId", referencedColumnName: "id" })
  tagQuantityUnit: BaseUnitEntity;
}
