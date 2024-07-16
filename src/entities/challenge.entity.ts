import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Content } from "./content.entity";

@Entity()
export class Challenge {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Content, (content) => content.challenges)
  content: Content;

  @Column({ nullable: true })
  challengeDescription: string;

  @Column({ type: "date", nullable: true })
  startDate: Date;

  @Column({ type: "date", nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: "json", nullable: true })
  tags: [];
}
