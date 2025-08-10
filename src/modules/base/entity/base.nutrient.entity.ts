import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseNutrientGroupEnum } from "../types";
import { BaseIngredientEntity, BaseUnitEntity } from ".";

@Entity("base_nutrient")
export class BaseNutrientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: true })
  description?: string;

  @Column({ type: "varchar", nullable: true })
  hint?: string;

  @Column({
    type: "enum",
    enum: BaseNutrientGroupEnum,
    nullable: false,
  })
  nutrientGroup: BaseNutrientGroupEnum;

  @Column({ type: "varchar", nullable: false })
  abbreviation: string;

  @Column({ type: "integer", nullable: false })
  baseUnitId: number;

  @Column({ type: "integer", nullable: true })
  order?: number;

  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "baseUnitId", referencedColumnName: "id" })
  baseUnit: BaseUnitEntity;
}

