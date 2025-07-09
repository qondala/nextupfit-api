import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user_recipe")
export class UserRecipeEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column()
  recipeId: number;

  @Column({ type: "bigint", nullable: true })
  contentId?: number;

  @Column({ type: "timestamp", nullable: true })
  startedAt?: Date;

  @Column({ type: "timestamp", nullable: true })
  finishedAt?: Date;

  @Column()
  userId: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "bigint", default: 0 })
  programId?: number;

  @Column({ type: "bigint", default: 0 })
  stepId?: number;

  @Column({ type: "bigint", default: 0 })
  activityId?: number;

  @Column({ type: "bigint", default: 0 })
  workingSessionId?: number;

  @Column({ type: "boolean", default: false })
  completed: boolean;
}
