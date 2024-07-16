import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Content } from "./content.entity";
import { TrainingSession } from "./training-session.entity";
import { SessionReview } from "./session-review.entity";
import { TrainingContentLink } from "./training-content-link.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.sessions)
  content: Content;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  sessionTime: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  maxParticipants: number;

  @Column({ nullable: true })
  type: string;

  @OneToMany(
    () => TrainingSession,
    (trainingSession) => trainingSession.session,
  )
  trainingSessions: TrainingSession[];

  @OneToMany(() => SessionReview, (sessionReview) => sessionReview.session)
  sessionReviews: SessionReview[];

  @OneToMany(
    () => TrainingContentLink,
    (trainingContentLink) => trainingContentLink.session,
  )
  trainingContentLinks: TrainingContentLink[];
}
