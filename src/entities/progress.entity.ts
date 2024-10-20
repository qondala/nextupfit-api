import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Exercise } from "./exercise.entity";

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.progress)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Exercise, (exercise) => exercise.progress)
  @JoinColumn()
  exercise: Exercise;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  completedAt: Date;
}
