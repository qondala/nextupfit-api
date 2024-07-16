import { Module } from "@nestjs/common";
import { ContentNutritionService } from "./contentnutrition.service";
import { ContentNutritionController } from "./contentnutrition.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContentNutrition } from "../../entities/content-nutrition.entity";
import { Content } from "../../entities/content.entity";
import { NutritionProgram } from "../../entities/nutrition-program.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([ContentNutrition, Content, NutritionProgram]),
  ],
  controllers: [ContentNutritionController],
  providers: [ContentNutritionService],
  exports: [ContentNutritionService],
})
export class ContentNutritionModule {}
