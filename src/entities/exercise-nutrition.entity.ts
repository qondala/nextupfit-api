import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Exercise } from "./exercise.entity";
import { NutritionProgram } from "./nutrition-program.entity";

@Entity()
export class ExerciseNutrition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.exerciseNutrition)
  exercise: Exercise;

  @ManyToOne(
    () => NutritionProgram,
    (nutritionProgram) => nutritionProgram.exerciseNutrition,
  )
  nutritionProgram: NutritionProgram;
}
