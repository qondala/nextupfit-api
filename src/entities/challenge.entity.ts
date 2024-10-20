import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Content } from "./content.entity";
import { UserChallenge } from "./user-challenge.entity";
import { Coach } from "./coach.entity";
import { Session } from "./session.entity";

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.challenges, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  content: Content;

  @Column({ nullable: true })
  challengeDescription: string;

  @Column({ type: "date", nullable: true })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: "json", nullable: true })
  tags: [];

  @OneToMany(() => UserChallenge, (userChallenge) => userChallenge.challenge)
  users: UserChallenge[];

  @OneToMany(() => Session, (session) => session.challenge)
  sessions: Session[];

  @ManyToOne(() => Coach, (coach) => coach.challenges)
  coach: Coach;
}
