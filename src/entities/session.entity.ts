import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Content } from "./content.entity";
import { TrainingSession } from "./training-session.entity";
import { SessionReview } from "./session-review.entity";
import { TrainingContentLink } from "./training-content-link.entity";
import { Coach } from "./coach.entity";
import { Challenge } from "./challenge.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.sessions, { eager: true })
  @JoinColumn()
  content: Content;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  sessionTime: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  maxParticipants: number;

  @Column({ nullable: true })
  type: string;

  @Column({ default: 5 })
  duration: number;

  @Column({ default: 0 })
  caloriesToburn: number;

  @OneToMany(
    () => TrainingSession,
    (trainingSession) => trainingSession.session,
    { cascade: true },
  )
  trainingSessions: TrainingSession[];

  @OneToMany(() => SessionReview, (sessionReview) => sessionReview.session)
  sessionReviews: SessionReview[];

  @OneToMany(
    () => TrainingContentLink,
    (trainingContentLink) => trainingContentLink.session,
    { cascade: true },
  )
  trainingContentLinks: TrainingContentLink[];

  @ManyToOne(() => Coach, (coach) => coach.sessions, { eager: true })
  coach: Coach;

  @ManyToOne(() => Challenge, (challenge) => challenge.sessions, {
    nullable: true,
  })
  @JoinColumn()
  challenge: Challenge;
}
