import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Coach } from "./coach.entity";

@Entity()
export class CoachFollow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.coachFollows)
  user: User;

  @ManyToOne(() => Coach, (coach) => coach.coachFollows)
  coach: Coach;

  @Column({ type: "date" })
  followDate: Date;
}
