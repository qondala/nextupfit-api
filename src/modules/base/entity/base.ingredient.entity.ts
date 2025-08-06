import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseIngredientTypeEnum } from "../types";

@Entity("base_ingredient")
export class BaseIngredientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: false })
  description: string;

  @Column({ type: "varchar", nullable: true })
  imageUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "varchar", nullable: true })
  brand?: string;

  @Column({ type: "enum", enum: BaseIngredientTypeEnum, nullable: false })
  type: BaseIngredientTypeEnum;

  @Column({ type: "varchar", nullable: true })
  code?: string;

  @Column({ type: "int", nullable: false })
  createdByUserId: number;
}
