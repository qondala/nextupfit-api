import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Coach } from "./coach.entity";

@Entity()
export class Recommendation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.recommendations)
  recommender: User;

  @ManyToOne(() => Coach, (coach) => coach.recommendations)
  recommendedCoach: Coach;

  @ManyToOne(() => User, (user) => user.recommendationsReceived)
  recommendedToUser: User;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  recommendationDate: Date;
}
