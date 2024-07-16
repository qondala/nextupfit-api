import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NutritionProgram } from "../../entities/nutrition-program.entity";
import { UserNutrition } from "../../entities/user-nutrition.entity";
import { User } from "../../entities/user.entity";
import { UserNutritionController } from "./usernutrition.controller";
import { UserNutritionService } from "./usernutrition.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserNutrition, User, NutritionProgram])],
  controllers: [UserNutritionController],
  providers: [UserNutritionService],
  exports: [UserNutritionService],
})
export class UserNutritionModule {}
