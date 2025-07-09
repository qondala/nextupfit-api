import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_workout")
export class ContentWorkoutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", nullable: true })
  contentId: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ default: false })
  displayTitle: boolean;

  @Column({ default: "base" })
  source: string;

  @Column({ type: "bigint" })
  workoutId: number;
}
