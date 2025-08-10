import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseFoodEntity, BaseNutrientEntity, BaseUnitEntity } from ".";

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

  @OneToOne(() => BaseFoodEntity)
  @JoinColumn({ name: "foodId", referencedColumnName: "id" })
  food: BaseFoodEntity;

  @OneToOne(() => BaseNutrientEntity)
  @JoinColumn({ name: "nutrientId", referencedColumnName: "id" })
  nutrient: BaseNutrientEntity;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "foodQtyUnitId", referencedColumnName: "id" })
  foodQtyUnit: BaseUnitEntity;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "nutrientQtyUnitId", referencedColumnName: "id" })
  nutrientQtyUnit: BaseUnitEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
