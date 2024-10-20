import { Module } from "@nestjs/common";
import { GoalsService } from "./goals.service";
import { GoalsController } from "./goals.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FitnessGoal } from "../../entities/fitness-goal.entity";
import { User } from "../../entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([FitnessGoal, User])],
  controllers: [GoalsController],
  providers: [GoalsService],
  exports: [GoalsService],
})
export class GoalsModule {}
