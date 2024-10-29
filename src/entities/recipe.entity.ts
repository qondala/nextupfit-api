import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Meal } from "./meal.entity";

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  instructions: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  calories: number;

  @Column({ nullable: true })
  protein: number;

  @Column({ nullable: true })
  carbs: number;

  @Column({ nullable: true })
  fat: number;

  @ManyToMany(() => Meal, (meal) => meal.recipes)
  meals: Meal[];
}
