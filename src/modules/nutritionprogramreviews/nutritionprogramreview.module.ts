import { Module } from "@nestjs/common";
import { NutritionProgramReviewsService } from "./nutritionprogramreviews.service";
import { NutritionProgramReviewsController } from "./nutritionprogramreviews.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NutritionProgramReview } from "../../entities/nutrition-program-review.entity";
import { NutritionProgram } from "../../entities/nutrition-program.entity";
import { User } from "../../entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([NutritionProgramReview, User, NutritionProgram]),
  ],
  controllers: [NutritionProgramReviewsController],
  providers: [NutritionProgramReviewsService],
  exports: [NutritionProgramReviewsService],
})
export class NutritionProgramReviewsModule {}
