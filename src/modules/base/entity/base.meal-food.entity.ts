import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("base_meal_food")
export class BaseMealFoodEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "int", nullable: false })
  mealId: number;


  @Column({ type: "int", nullable: false })
  foodId: number;


  @Column({ type: "int", nullable: false })
  foodQty: number;


  @Column({ type: "int", nullable: false })
  foodQtyUnitId: number;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
