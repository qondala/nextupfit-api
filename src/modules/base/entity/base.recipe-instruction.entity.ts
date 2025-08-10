import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseRecipeEntity, BaseRecipeInstructionTagEntity } from ".";

@Entity("base_recipe_instruction")
export class BaseRecipeInstructionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", nullable: false })
  recipeId: number;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  imageUrl?: string;

  @Column({ type: "integer", nullable: true })
  order?: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt?: Date;

  @ManyToOne(() => BaseRecipeEntity, (recipe) => recipe.instructions)
  recipe: BaseRecipeEntity;

  @OneToMany(() => BaseRecipeInstructionTagEntity, (tag) => tag.recipeInstruction)
  tags: BaseRecipeInstructionTagEntity[];
}
