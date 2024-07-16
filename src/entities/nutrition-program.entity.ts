import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { ContentNutrition } from "./content-nutrition.entity";
import { NutritionDetail } from "./nutrition-detail.entity";
import { NutritionProgramReview } from "./nutrition-program-review.entity";
import { UserNutrition } from "./user-nutrition.entity";
import { UserNutritionProgress } from "./user-nutrition-progress.entity";
import { ExerciseNutrition } from "./exercise-nutrition.entity";
import { Coach } from "./coach.entity";

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

  @OneToMany(
    () => ContentNutrition,
    (contentNutrition) => contentNutrition.nutritionProgram,
  )
  contentNutrition: ContentNutrition[];

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

  @OneToMany(
    () => ExerciseNutrition,
    (exerciseNutrition) => exerciseNutrition.nutritionProgram,
  )
  exerciseNutrition: ExerciseNutrition[];

  @ManyToOne(() => Coach, (coach) => coach.nutritionPrograms)
  coach: Coach;

  @OneToMany(
    () => NutritionProgramReview,
    (nutritionProgramReview) => nutritionProgramReview.nutritionProgram,
  )
  reviews: NutritionProgramReview[];
}
