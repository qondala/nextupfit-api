import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";



@Entity("content_textarea")
export class ContentTextareaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "integer"})
  contentId: number;

  @Column()
  title: string;


  @Column({type: "text"})
  content: string;

  @Column()
  displayTitle: boolean;
}
