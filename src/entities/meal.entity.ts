import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Food } from "./food.entity";
import { Recipe } from "./recipe.entity";

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: ["breakfast", "lunch", "dinner", "snack"] })
  mealType: "breakfast" | "lunch" | "dinner" | "snack";

  @Column({ type: "date" })
  date: Date;

  @ManyToMany(() => Food, (food) => food.meals)
  @JoinTable()
  foods: Food[];

  @ManyToMany(() => Recipe, (recipe) => recipe.meals)
  @JoinTable()
  recipes: Recipe[];
}
