import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { NutritionProgram } from "./nutrition-program.entity";

@Entity()
export class NutritionDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => NutritionProgram,
    (nutritionProgram) => nutritionProgram.nutritionDetails,
  )
  @JoinColumn()
  nutritionProgram: NutritionProgram;

  @Column(/*{ type: 'enum', enum: ['breakfast', 'lunch', 'dinner', 'snack'] }*/)
  mealType: string; //'breakfast' | 'lunch' | 'dinner' | 'snack';

  @Column({ nullable: true })
  ingredients: string;

  @Column({ nullable: true })
  preparation: string;

  @Column({ nullable: true })
  calories: number;

  @Column({ type: "float", nullable: true })
  proteins: number;

  @Column({ type: "float", nullable: true })
  carbs: number;

  @Column({ type: "float", nullable: true })
  fats: number;
}
