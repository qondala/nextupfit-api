import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { UserCommitmentCompletedItemEntity } from ".";

/**
 * Entity representing a row from the `user_commitment` table.
 */
@Entity("user_commitment")
export class UserCommitmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  commitmentId: number;

  @Column({ type: "timestamp", nullable: true })
  dateUserStarted?: Date;

  @Column({ type: "timestamp", nullable: true })
  dateUserCompleted?: Date;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: false })
  failed: boolean;

  @Column({ nullable: false })
  userId: number;

  @Column({ type: "integer", nullable: true })
  timeSpent?: number;

  @Column({ type: "integer", nullable: true })
  timeSpentUnitId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => UserCommitmentCompletedItemEntity, (item) => item.userCommitementId)
  completedItems: UserCommitmentCompletedItemEntity[];
}
