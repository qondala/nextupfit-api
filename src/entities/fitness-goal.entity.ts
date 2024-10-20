import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { User } from "./user.entity";
import { Content } from "./content.entity";
import { Exercise } from "./exercise.entity";

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

  @ManyToMany(() => Content, (content) => content.goals)
  contents: Content[];

  @ManyToMany(() => Exercise, (exercise) => exercise.goals)
  exercises: Exercise[];
}
