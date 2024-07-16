import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Content } from "./content.entity";
import { ExerciseGoal } from "./exercise-goal.entity";
import { ExerciseNutrition } from "./exercise-nutrition.entity";
import { Progress } from "./progress.entity";

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.exercises)
  content: Content;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  goalSpecifics: string;

  @OneToMany(() => ExerciseGoal, (exerciseGoal) => exerciseGoal.exercise)
  exerciseGoals: ExerciseGoal[];

  @OneToMany(
    () => ExerciseNutrition,
    (exerciseNutrition) => exerciseNutrition.exercise,
  )
  exerciseNutrition: ExerciseNutrition[];

  @OneToMany(() => Progress, (progress) => progress.exercise)
  progress: Progress[];
}
