import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "user_commitment_completed_item" })
export class UserCommitmentCompletedItemEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ name: "userCommitementId", type: "bigint" })
  userCommitementId: number;

  @Column({ name: "completedItemId", type: "bigint" })
  completedItemId: number;

  @Column({ name: "dateCompleted", type: "timestamp", nullable: true })
  dateCompleted?: Date;

  @Column({ name: "userId", type: "bigint", nullable: true })
  userId?: number;

  @Column({ name: "timeSpent", type: "int", nullable: true })
  timeSpent?: number;

  @Column({ name: "timeSpentUnitId", type: "int", nullable: true })
  timeSpentUnitId?: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt", nullable: true })
  updatedAt?: Date;

  @Column({ name: "dateStarted", type: "timestamp", nullable: true })
  dateStarted?: Date;
}
