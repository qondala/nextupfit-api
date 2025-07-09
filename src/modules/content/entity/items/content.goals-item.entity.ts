import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

/**
 * Entity representing a single goal item in a goals block.
 * Table: content_goals_item
 */
@Entity("content_goals_item")
export class ContentGoalsItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", nullable: false })
  contentGoalsId: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "integer" })
  position: number;

  @Column({ type: "integer", nullable: true })
  baseGoalId?: number;
}
