import { Module } from "@nestjs/common";
import { UserNutritionProgressService } from "./usernutritionprogress.service";
import { UserNutritionProgressController } from "./usernutritionprogress.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserNutritionProgress } from "../../entities/user-nutrition-progress.entity";
import { NutritionProgram } from "../../entities/nutrition-program.entity";
import { User } from "../../entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserNutritionProgress, User, NutritionProgram]),
  ],
  controllers: [UserNutritionProgressController],
  providers: [UserNutritionProgressService],
  exports: [UserNutritionProgressService],
})
export class UserNutritionProgressModule {}
