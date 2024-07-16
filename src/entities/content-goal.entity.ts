import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinTable,
} from "typeorm";
import { Content } from "./content.entity";
import { FitnessGoal } from "./fitness-goal.entity";

@Entity()
export class ContentGoal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.goals)
  content: Content;

  @ManyToOne(() => FitnessGoal, (goal) => goal.contentGoals)
  @JoinTable()
  goal: FitnessGoal;
}
