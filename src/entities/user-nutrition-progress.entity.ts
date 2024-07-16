import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { NutritionProgram } from "./nutrition-program.entity";

@Entity()
export class UserNutritionProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userNutritionProgress)
  user: User;

  @ManyToOne(
    () => NutritionProgram,
    (nutritionProgram) => nutritionProgram.userNutritionProgress,
  )
  nutritionProgram: NutritionProgram;

  @Column({ type: "date" })
  dateLogged: Date;

  @Column({ type: "json", nullable: true })
  mealsConsumed: string;

  @Column({ nullable: true })
  caloriesIntake: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  proteinIntake: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  carbsIntake: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  fatsIntake: number;

  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  adherenceScore: number;
}
