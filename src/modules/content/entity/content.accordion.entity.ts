import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentAccordionItemEntity } from "./items";



@Entity("content_accordion")
export class ContentAccordionEntity {
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

  @OneToMany(() => ContentAccordionItemEntity, (item) => item.accordionId)
  items: ContentAccordionItemEntity[];
}