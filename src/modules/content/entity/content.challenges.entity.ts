import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentChallengesItemEntity } from "./items";



@Entity("content_challenges")
export class ContentChallengesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "integer"})
  contentId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  displayTitle: boolean;

  @OneToMany(() => ContentChallengesItemEntity, (item) => item.challengesId)
  items: ContentChallengesItemEntity[];
}