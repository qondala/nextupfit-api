import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseFoodGroupEntity, BaseFoodNutrientEntity } from ".";
import { BaseFoodProcessTypeEnum } from "../types";

@Entity("base_food")
export class BaseFoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "varchar", nullable: false })
  description: string;

  @Column({ type: "varchar", nullable: true })
  iconUrl?: string;

  @Column({ type: "bigint", nullable: false })
  createdByUserId: number;

  @Column({ type: "integer", nullable: false })
  foodGroupId: number;

  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;

  @Column({ type: "enum", enum: BaseFoodProcessTypeEnum, nullable: true })
  processType?: BaseFoodProcessTypeEnum;

  @ManyToOne(() => BaseFoodGroupEntity, (foodGroup) => foodGroup.foods)
  @JoinColumn({ name: "foodGroupId", referencedColumnName: "id" })
  foodGroup: BaseFoodGroupEntity;

  @OneToMany(() => BaseFoodNutrientEntity, (foodNutrient) => foodNutrient.food)
  nutrients: BaseFoodNutrientEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
