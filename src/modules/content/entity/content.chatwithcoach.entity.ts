import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";



@Entity("content_chatwithcoach")
export class ContentChatWithCoachEntity {
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

  @Column({type: "integer"})
  coachId: number;
}