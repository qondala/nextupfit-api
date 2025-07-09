import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ContentCommitmentItemEntity } from "./items";



@Entity("content_commitment")
export class ContentCommitmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "integer"})
  contentId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  displayTitle: boolean;

  @Column({type: "integer"})
  completeWithin: number;

  @Column({type: "integer"})
  completeWithinTimeUnitId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ContentCommitmentItemEntity, (item) => item.commitmentId)
  items: ContentCommitmentItemEntity[];
}
