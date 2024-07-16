import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Coach } from "./coach.entity";

@Entity()
export class PrivateDiscussion {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.privateDiscussions)
  user: User;

  @ManyToOne(() => Coach, (coach) => coach.privateDiscussions)
  coach: Coach;

  @Column({ nullable: true })
  message: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
