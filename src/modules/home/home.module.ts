import { Module } from "@nestjs/common";
import { HomeService } from "./home.service";
import { HomeController } from "./home.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/entities/category.entity";
import { Challenge } from "src/entities/challenge.entity";
import { CoachFollow } from "src/entities/coach-follow.entity";
import { Content } from "src/entities/content.entity";
import { TrainingSession } from "src/entities/training-session.entity";
import { User } from "src/entities/user.entity";
import { Session } from "src/entities/session.entity";
import { Coach } from "src/entities/coach.entity";
import { NutritionProgram } from "src/entities/nutrition-program.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Category,
      Session,
      Challenge,
      User,
      Content,
      CoachFollow,
      TrainingSession,
      Coach,
      NutritionProgram,
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
