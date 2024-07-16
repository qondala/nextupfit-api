import { Module } from "@nestjs/common";
import { NutritionDetailsService } from "./nutritiondetails.service";
import { NutritionDetailsController } from "./nutritiondetails.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NutritionDetail } from "../../entities/nutrition-detail.entity";
import { NutritionProgram } from "../../entities/nutrition-program.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NutritionDetail, NutritionProgram])],
  controllers: [NutritionDetailsController],
  providers: [NutritionDetailsService],
  exports: [NutritionDetailsService],
})
export class NutritionDetailsModule {}
