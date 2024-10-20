import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Coach } from "./coach.entity";
import { Content } from "./content.entity";

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coach, (coach) => coach.news)
  @JoinColumn()
  coach: Coach;

  @Column({ nullable: true })
  title: string;

  @OneToOne(() => Content, (content) => content.news)
  @JoinColumn()
  content: Content;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  publishedDate: Date;
}
