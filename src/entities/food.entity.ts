import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Meal } from "./meal.entity";

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  calories: number;

  @Column({ nullable: true })
  protein: number;

  @Column({ nullable: true })
  carbs: number;

  @Column({ nullable: true })
  fat: number;

  @ManyToMany(() => Meal, (meal) => meal.foods)
  meals: Meal[];
}
