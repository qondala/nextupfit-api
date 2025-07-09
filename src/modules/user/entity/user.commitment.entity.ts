import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user_commitment")
export class UserCommitmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  commitmentId: number;

  @Column({ type: "timestamp" })
  dateUserStarted: Date;

  @Column({ type: "timestamp" })
  dateUserCompleted: Date;

  @Column({ type: "boolean" })
  completed: boolean;

  @Column({ type: "boolean" })
  failed: boolean;

  @Column({ type: "float" })
  timeSpent: number;

  @Column({ type: "float" })
  timeSpentUnitId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
