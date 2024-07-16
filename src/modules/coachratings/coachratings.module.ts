import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoachRating } from "../../entities/coach-rating.entity";
import { Coach } from "../../entities/coach.entity";
import { User } from "../../entities/user.entity";
import { CoachRatingsService } from "./caochratings.service";
import { CoachRatingsController } from "./coachratings.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CoachRating, User, Coach])],
  controllers: [CoachRatingsController],
  providers: [CoachRatingsService],
  exports: [CoachRatingsService],
})
export class CoachRatingsModule {}
