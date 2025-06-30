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
  ProgramItemTypeEnum
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
  containerId: number;


  @Column({
    type: "enum",
    enum: ProgramItemTypeEnum,
    default: ProgramItemTypeEnum.activity,
  })
  containerType: ProgramItemTypeEnum;


  @Column({ default: 0 })
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
