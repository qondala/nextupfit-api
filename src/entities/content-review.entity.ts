import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Content } from "./content.entity";

@Entity()
export class ContentReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.contentReviews)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Content, (content) => content.reviews)
  @JoinColumn()
  content: Content;

  @Column({ nullable: true })
  rating?: number;

  @Column({ nullable: true })
  reviewText: string;

  @CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
  reviewDate: Date;
}
