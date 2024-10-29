import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { NutritionProgram } from "./nutrition-program.entity";

@Entity()
export class UserNutritionProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userNutritionProgress)
  @JoinColumn()
  user: User;

  @ManyToOne(
    () => NutritionProgram,
    (nutritionProgram) => nutritionProgram.userNutritionProgress,
    { nullable: true },
  )
  @JoinColumn()
  nutritionProgram?: NutritionProgram;

  @Column({ type: "date" })
  dateLogged: Date;

  @Column({ type: "json", nullable: true })
  mealsConsumed: any;

  @Column({ nullable: true })
  caloriesIntake: number;

  @Column({ type: "float", nullable: true })
  proteinIntake: number;

  @Column({ type: "float", nullable: true })
  carbsIntake: number;

  @Column({ type: "float", nullable: true })
  fatsIntake: number;

  @Column({ type: "float", nullable: true })
  adherenceScore: number;

  @Column({
    type: "enum",
    enum: ["breakfast", "lunch", "dinner", "snack"],
    default: "breakfast",
  })
  mealType: string;
}
