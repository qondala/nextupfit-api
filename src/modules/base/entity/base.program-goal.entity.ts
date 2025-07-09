import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { ProgramTypeEnum } from "@app/module/program/types";

@Entity("base_program_goal")
export class BaseProgramGoalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: true })
  description?: string;

  @Column({ type: "enum", enum: ProgramTypeEnum, nullable: true })
  framework?: ProgramTypeEnum;

  @Column({ type: "varchar", nullable: true })
  icon?: string;

  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
