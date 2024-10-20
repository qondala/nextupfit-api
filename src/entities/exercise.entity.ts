import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
  ManyToMany,
} from "typeorm";
import { Content } from "./content.entity";
import { Progress } from "./progress.entity";
import { FitnessGoal } from "./fitness-goal.entity";
import { NutritionProgram } from "./nutrition-program.entity";

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

  @ManyToMany(() => FitnessGoal, (fitnessGoal) => fitnessGoal.exercises)
  @JoinTable()
  goals: FitnessGoal[];

  @OneToMany(
    () => NutritionProgram,
    (nutritionProgram) => nutritionProgram.exercises,
  )
  @JoinTable()
  nutritionPrograms: NutritionProgram[];

  @OneToMany(() => Progress, (progress) => progress.exercise)
  progress: Progress[];
}
