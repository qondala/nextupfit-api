import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ColumnType,
} from "typeorm";
import { User } from "./user.entity";
import { Exercise } from "./exercise.entity";

@Entity()
export class Progress {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.progress)
  user: User;

  @ManyToOne(() => Exercise, (exercise) => exercise.progress)
  exercise: Exercise;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  completedAt: Date;
}
