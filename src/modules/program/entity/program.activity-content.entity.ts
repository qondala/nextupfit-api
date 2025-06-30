import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import {
  ActivityContent,
  ProgramActivityContentTypeEnum,
  ProgramContentHolderTypeEnum
} from "../types";


@Entity("program_activity_content")
export class ProgramActivityContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  gymOwnerId: number;

  @Column()
  gymManagerOwnerId: number;

  @Column({
    type: "enum",
    enum: ProgramActivityContentTypeEnum,
    default: ProgramActivityContentTypeEnum.accordion,
  })
  type: ProgramActivityContentTypeEnum;

  @Column({ type: "json" })
  content: ActivityContent;

  @Column()
  contentHolderId: number;

  @Column({
    type: "enum",
    enum: ProgramContentHolderTypeEnum,
    default: ProgramContentHolderTypeEnum.program_step,
  })
  contentHolderType: ProgramContentHolderTypeEnum;

  @Column({ default: 0 })
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
