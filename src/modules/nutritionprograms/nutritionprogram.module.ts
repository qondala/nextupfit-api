import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentNutrition } from "../../entities/content-nutrition.entity";
import { NutritionDetail } from "../../entities/nutrition-detail.entity";
import { NutritionProgramReview } from "../../entities/nutrition-program-review.entity";
import { NutritionProgram } from "../../entities/nutrition-program.entity";
import { UserNutritionProgress } from "../../entities/user-nutrition-progress.entity";
import { UserNutrition } from "../../entities/user-nutrition.entity";
import { NutritionProgramsController } from "./nutritionprogram.controller";
import { NutritionProgramsService } from "./nutritionprogram.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NutritionProgram,
      ContentNutrition,
      UserNutrition,
      UserNutritionProgress,
      NutritionDetail,
      NutritionProgramReview,
    ]),
  ],
  controllers: [NutritionProgramsController],
  providers: [NutritionProgramsService],
  exports: [NutritionProgramsService],
})
export class NutritionProgramsModule {}
