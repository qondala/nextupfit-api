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
export class NutritionProgramReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.nutritionProgramReviews)
  user: User;

  @ManyToOne(
    () => NutritionProgram,
    (nutritionProgram) => nutritionProgram.nutritionProgramReviews,
  )
  @JoinColumn()
  nutritionProgram: NutritionProgram;

  @Column()
  rating: number;

  @Column({ nullable: true })
  reviewText: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  reviewDate: Date;
}
