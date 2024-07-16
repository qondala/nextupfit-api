import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Coach } from "./coach.entity";

@Entity()
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Coach, (coach) => coach.news)
  coach: Coach;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true, type: "text" })
  content: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  publishedDate: Date;
}
