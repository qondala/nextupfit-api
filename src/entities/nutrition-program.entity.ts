import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { NutritionDetail } from "./nutrition-detail.entity";
import { NutritionProgramReview } from "./nutrition-program-review.entity";
import { UserNutrition } from "./user-nutrition.entity";
import { UserNutritionProgress } from "./user-nutrition-progress.entity";
import { Coach } from "./coach.entity";
import { Exercise } from "./exercise.entity";
import { Content } from "./content.entity";

@Entity()
export class NutritionProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @ManyToMany(() => Content, (content) => content.nutritionPrograms)
  @JoinTable()
  contents: Content[];

  @OneToMany(
    () => NutritionDetail,
    (nutritionDetail) => nutritionDetail.nutritionProgram,
  )
  nutritionDetails: NutritionDetail[];

  @OneToMany(
    () => NutritionProgramReview,
    (nutritionProgramReview) => nutritionProgramReview.nutritionProgram,
  )
  nutritionProgramReviews: NutritionProgramReview[];

  @OneToMany(
    () => UserNutrition,
    (userNutrition) => userNutrition.nutritionProgram,
  )
  userNutrition: UserNutrition[];

  @OneToMany(
    () => UserNutritionProgress,
    (userNutritionProgress) => userNutritionProgress.nutritionProgram,
  )
  userNutritionProgress: UserNutritionProgress[];

  @ManyToMany(() => Exercise, (exercise) => exercise.nutritionPrograms)
  exercises: Exercise[];

  @ManyToOne(() => Coach, (coach) => coach.nutritionPrograms)
  coach: Coach;

  @OneToMany(
    () => NutritionProgramReview,
    (nutritionProgramReview) => nutritionProgramReview.nutritionProgram,
  )
  reviews: NutritionProgramReview[];
}
