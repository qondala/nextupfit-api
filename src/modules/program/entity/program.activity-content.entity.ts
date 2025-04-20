import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ActivityContent, ProgramActivityContentTypeEnum } from "../types";


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

  @Column({ type: "jsonb" })
  content: ActivityContent;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
