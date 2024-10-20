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
export class UserNutrition {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userNutrition)
  @JoinColumn()
  user: User;

  @ManyToOne(
    () => NutritionProgram,
    (nutritionProgram) => nutritionProgram.userNutrition,
    { nullable: true },
  )
  @JoinColumn()
  nutritionProgram?: NutritionProgram;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  startDate: Date;

  @Column({ type: "float", default: 100.0 })
  adherencePercentage: number;
}
