import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoachFollow } from "../../entities/coach-follow.entity";
import { Coach } from "../../entities/coach.entity";
import { User } from "../../entities/user.entity";
import { CoachFollowsService } from "./caochfollows.service";
import { CoachFollowsController } from "./coachfollows.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CoachFollow, User, Coach])],
  controllers: [CoachFollowsController],
  providers: [CoachFollowsService],
  exports: [CoachFollowsService],
})
export class CoachFollowsModule {}
