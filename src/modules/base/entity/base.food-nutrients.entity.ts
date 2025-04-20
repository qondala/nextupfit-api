import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("base_food_nutrients")
export class BaseFoodNutrientsEntity {

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


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
