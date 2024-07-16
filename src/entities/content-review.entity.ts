import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Content } from "./content.entity";

@Entity()
export class ContentReview {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.contentReviews)
  user: User;

  @ManyToOne(() => Content, (content) => content.reviews)
  content: Content;

  @Column()
  rating: number;

  @Column({ nullable: true })
  reviewText: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  reviewDate: Date;
}
