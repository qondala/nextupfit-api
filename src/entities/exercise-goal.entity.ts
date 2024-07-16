import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Exercise } from "./exercise.entity";
import { FitnessGoal } from "./fitness-goal.entity";

@Entity()
export class ExerciseGoal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exercise, (exercise) => exercise.exerciseGoals)
  exercise: Exercise;

  @ManyToOne(() => FitnessGoal, (goal) => goal.exerciseGoals)
  goal: FitnessGoal;
}
