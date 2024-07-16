import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Session } from "./session.entity";

@Entity()
export class TrainingSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.trainingSessions)
  user: User;

  @ManyToOne(() => Session, (session) => session.trainingSessions)
  session: Session;

  @Column({ default: false })
  attended: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  attendanceDate: Date;
}
