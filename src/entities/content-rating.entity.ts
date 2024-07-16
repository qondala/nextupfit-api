import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { Content } from "./content.entity";

@Entity()
export class ContentRating {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.contentRatings)
  user: User;

  @ManyToOne(() => Content, (content) => content.ratings)
  content: Content;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  ratingDate: Date;

  @Column({ nullable: true })
  easeOfUse: number;

  @Column({ nullable: true })
  effectiveness: number;
}
