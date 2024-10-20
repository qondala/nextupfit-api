import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Challenge } from "./challenge.entity";

@Entity()
export class UserChallenge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userNutrition, { eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Challenge, (challenge) => challenge.users)
  @JoinColumn()
  challenge: Challenge;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  startDate: Date;
}
