import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseFoodEntity, BaseMealEntity, BaseUnitEntity } from ".";

@Entity("base_meal_food")
export class BaseMealFoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer", nullable: false })
  mealId: number;

  @Column({ type: "integer", nullable: false })
  foodId: number;

  @Column({ type: "decimal", nullable: false })
  foodQty: number;

  @Column({ type: "integer", nullable: false })
  foodQtyUnitId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseMealEntity)
  @JoinColumn({ name: "mealId", referencedColumnName: "id" })
  meal: BaseMealEntity;

  @ManyToOne(() => BaseFoodEntity)
  @JoinColumn({ name: "foodId", referencedColumnName: "id" })
  food: BaseFoodEntity;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "foodQtyUnitId", referencedColumnName: "id" })
  foodQtyUnit: BaseUnitEntity;
}
