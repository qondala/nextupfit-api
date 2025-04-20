import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { BaseNutrientGroupEnum } from "../types";


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
    nullable: false
  })
  nutrientGroup: BaseNutrientGroupEnum;


  @Column({ type: "varchar", nullable: false })
  abbreviation: string;


  @Column({ type: "int", nullable: false })
  baseUnitId: number;


  @Column({ type: "int", nullable: true })
  order?: number;


  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
