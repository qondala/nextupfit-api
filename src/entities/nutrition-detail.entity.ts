import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { NutritionProgram } from "./nutrition-program.entity";

@Entity()
export class NutritionDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => NutritionProgram,
    (nutritionProgram) => nutritionProgram.nutritionDetails,
  )
  nutritionProgram: NutritionProgram;

  @Column(/*{ type: 'enum', enum: ['breakfast', 'lunch', 'dinner', 'snack'] }*/)
  mealType: string; //'breakfast' | 'lunch' | 'dinner' | 'snack';

  @Column({ nullable: true })
  ingredients: string;

  @Column({ nullable: true })
  preparation: string;

  @Column({ nullable: true })
  calories: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  proteins: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  carbs: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  fats: number;
}
