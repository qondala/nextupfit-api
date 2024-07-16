import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { NutritionProgram } from "./nutrition-program.entity";

@Entity()
export class UserNutrition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userNutrition)
  user: User;

  @ManyToOne(
    () => NutritionProgram,
    (nutritionProgram) => nutritionProgram.userNutrition,
  )
  nutritionProgram: NutritionProgram;

  @Column({ type: "date", nullable: true })
  startDate: Date;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 100.0 })
  adherencePercentage: number;
}
