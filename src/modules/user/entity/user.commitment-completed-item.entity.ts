import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user_commitment_completed_item")
export class UserCommitmentCompletedItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userCommitementId: number;

  @Column()
  completedItemId: number;

  @Column()
  dateCompleted: Date;

  @Column()
  dateStarted: Date;

  @Column()
  timeSpent: number;

  @Column()
  timeSpentUnitId: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
