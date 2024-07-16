import { Module } from "@nestjs/common";
import { ExerciseNutritionService } from "./exercisenutrition.service";
import { ExerciseNutritionController } from "./exercisenutrition.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseNutrition } from "../../entities/exercise-nutrition.entity";
import { Exercise } from "../../entities/exercise.entity";
import { NutritionProgram } from "../../entities/nutrition-program.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ExerciseNutrition, Exercise, NutritionProgram]),
  ],
  controllers: [ExerciseNutritionController],
  providers: [ExerciseNutritionService],
  exports: [ExerciseNutritionService],
})
export class ExerciseNutritionModule {}
