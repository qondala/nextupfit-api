import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentChallengesEntity } from "../content.challenges.entity";



@Entity("content_challenges_item")
export class ContentChallengesItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "integer"})
  challengesId: number;

  @Column({type: "integer"})
  challengeId: number;

  @Column({type: "integer"})
  position: number;

  @ManyToOne(() => ContentChallengesEntity, (challenges) => challenges.items)
  challenges: ContentChallengesEntity;
}