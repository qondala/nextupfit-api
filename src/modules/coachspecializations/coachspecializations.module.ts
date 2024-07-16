import { Module } from "@nestjs/common";
import { CoachSpecializationsService } from "./coachspecializations.service";
import { CoachSpecialization } from "../../entities/coach-specialization.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Coach } from "../../entities/coach.entity";
import { CoachSpecializationsController } from "./caochspecializations.controller";

@Module({
  imports: [TypeOrmModule.forFeature([CoachSpecialization, Coach])],
  controllers: [CoachSpecializationsController],
  providers: [CoachSpecializationsService],
  exports: [CoachSpecializationsService],
})
export class CoachSpecializationsModule {}
