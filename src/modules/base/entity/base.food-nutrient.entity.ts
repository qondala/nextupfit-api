import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { BaseFoodEntity, BaseNutrientEntity } from ".";


@Entity("base_food_nutrient")
export class BaseFoodNutrientEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "int", nullable: false })
  foodId: number;


  @Column({ type: "int", nullable: true })
  foodQty: number;


  @Column({ type: "int", nullable: false })
  foodQtyUnitId: number;


  @Column({ type: "int", nullable: false })
  nutrientId: number;


  @Column({ type: "int", nullable: false })
  nutrientQty: number;


  @Column({ type: "int", nullable: false })
  nutrientQtyUnitId: number;


  @Column({ type: "int", nullable: false })
  createdByUserId: number;


  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;


  @OneToOne(() => BaseFoodEntity)
  @JoinColumn({ name: "foodId" })
  food: BaseFoodEntity;


  @OneToOne(() => BaseNutrientEntity)
  @JoinColumn({ name: "nutrientId" })
  nutrient: BaseNutrientEntity;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
