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
export class CoachRating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.coachRatings)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Coach, (coach) => coach.ratings)
  @JoinColumn()
  coach: Coach;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  ratingDate: Date;
}
