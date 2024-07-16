import { Module } from "@nestjs/common";

import { RecommendationsController } from "./recommendations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coach } from "../../entities/coach.entity";
import { Recommendation } from "../../entities/recommendation.entity";
import { User } from "../../entities/user.entity";
import { RecommendationsService } from "./recommendations.service";

@Module({
  imports: [TypeOrmModule.forFeature([Recommendation, User, Coach])],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
  exports: [RecommendationsService],
})
export class RecommendationsModule {}
