import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_recipe")
export class ContentRecipeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "bigint" })
  contentId: number;

  @Column({ type: "integer" })
  recipeId: number;

  @Column({ nullable: true })
  title?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "boolean", default: false })
  displayTitle: boolean;
}
