import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.notifications)
  @JoinColumn()
  user: User;

  @Column()
  message: string;

  @Column({ default: false })
  isRead: boolean;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
