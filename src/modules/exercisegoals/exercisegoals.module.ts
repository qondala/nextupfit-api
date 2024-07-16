import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExerciseGoal } from "../../entities/exercise-goal.entity";
import { Exercise } from "../../entities/exercise.entity";
import { FitnessGoal } from "../../entities/fitness-goal.entity";
import { ExerciseGoalsController } from "./exercisegoals.controller";
import { ExerciseGoalsService } from "./exercisegoals.service";

@Module({
  imports: [TypeOrmModule.forFeature([ExerciseGoal, Exercise, FitnessGoal])],
  controllers: [ExerciseGoalsController],
  providers: [ExerciseGoalsService],
  exports: [ExerciseGoalsService],
})
export class ExerciseGoalsModule {}
