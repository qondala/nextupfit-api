import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { BaseRecipeInstructionTagEnum } from "../types";

@Entity("base_recipe_instruction_tag")
export class BaseRecipeInstructionTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: BaseRecipeInstructionTagEnum,
    nullable: false
  })
  tagType: BaseRecipeInstructionTagEnum;

  @Column({
    type: "integer",
    nullable: false
  })
  tagId: number;

  @Column({
    type: "integer",
    default: 0
  })
  order?: number;

  @Column({
    type: "integer",
    nullable: false
  })
  recipeInstructionId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
