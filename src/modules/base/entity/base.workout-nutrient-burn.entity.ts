import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("base_workout_nutrient_burn")
export class BaseWorkoutNutrientBurnEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "int", nullable: false })
  baseWorkoutId: number;


  @Column({ type: "int", nullable: false })
  duration: number;


  @Column({ type: "int", nullable: false })
  durationUnitId: number;


  @Column({ type: "int", nullable: false })
  nutrientId: number;


  @Column({ type: "int", nullable: false })
  burnsNutrientQty: number;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}