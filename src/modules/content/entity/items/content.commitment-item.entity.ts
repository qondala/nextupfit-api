import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ContentCommitmentEntity } from "../content.commitment.entity";



@Entity("content_commitment_item")
export class ContentCommitmentItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "integer"})
  commitmentId: number;

  @Column({type: "integer"})
  completeBefore: number;

  @Column({type: "integer"})
  completeBeforeTimeUnitId: number;

  @Column({type: "integer"})
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ContentCommitmentEntity, (commitment) => commitment.items)
  commitment: ContentCommitmentEntity;
}