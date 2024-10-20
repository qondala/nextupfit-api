import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Coach } from "./coach.entity";

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.recommendations)
  @JoinColumn()
  recommender: User;

  @ManyToOne(() => Coach, (coach) => coach.recommendations)
  @JoinColumn()
  recommendedCoach: Coach;

  @ManyToOne(() => User, (user) => user.recommendationsReceived)
  @JoinColumn()
  recommendedToUser: User;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  recommendationDate: Date;
}
