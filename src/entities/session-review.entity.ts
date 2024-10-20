import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Session } from "./session.entity";

@Entity()
export class SessionReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.sessionReviews)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Session, (session) => session.sessionReviews)
  @JoinColumn()
  session: Session;

  @Column()
  rating: number;

  @Column({ nullable: true })
  reviewText: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  reviewDate: Date;
}
