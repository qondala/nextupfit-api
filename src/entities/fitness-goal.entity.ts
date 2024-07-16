import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./user.entity";
import { ContentGoal } from "./content-goal.entity";
import { ExerciseGoal } from "./exercise-goal.entity";

@Entity()
export class FitnessGoal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  goalDescription: string;

  @Column({ nullable: true })
  targetDate: Date;

  @Column(/*{ type: 'enum', enum: ['active', 'completed', 'failed'], default: 'active' }*/)
  status: "active" | "completed" | "failed";

  @ManyToOne(() => User, (user) => user.goals)
  user: User;

  @OneToMany(() => ContentGoal, (contentGoal) => contentGoal.goal)
  contentGoals: ContentGoal[];

  @OneToMany(() => ExerciseGoal, (exerciseGoal) => exerciseGoal.goal)
  exerciseGoals: ExerciseGoal[];
}
