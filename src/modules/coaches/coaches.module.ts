import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoachQualification } from "../../entities/coach-qualification.entity";
import { CoachRating } from "../../entities/coach-rating.entity";
import { CoachSpecialization } from "../../entities/coach-specialization.entity";
import { Coach } from "../../entities/coach.entity";
import { Content } from "../../entities/content.entity";
import { News } from "../../entities/news.entity";
import { PrivateDiscussion } from "../../entities/private-discussion.entity";
import { User } from "../../entities/user.entity";
import { CoachesController } from "./coaches.controller";
import { CoachesService } from "./coaches.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Coach,
      User,
      Content,
      CoachQualification,
      CoachSpecialization,
      CoachRating,
      PrivateDiscussion,
      News,
    ]),
  ],
  controllers: [CoachesController],
  providers: [CoachesService],
  exports: [CoachesService],
})
export class CoachesModule {}
