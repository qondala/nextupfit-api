import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoachQualification } from "../../entities/coach-qualification.entity";
import { Coach } from "../../entities/coach.entity";
import { CoachQualificationsService } from "./coachqualifications.servive";
import { CoachQualificationsController } from "./coachqualifications.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CoachQualification, Coach])],
  controllers: [CoachQualificationsController],
  providers: [CoachQualificationsService],
  exports: [CoachQualificationsService],
})
export class CoachQualificationsModule {}
