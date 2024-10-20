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
export class CoachFollow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.coachFollows)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Coach, (coach) => coach.coachFollows)
  @JoinColumn()
  coach: Coach;

  @Column({ type: "date" })
  followDate: Date;
}
