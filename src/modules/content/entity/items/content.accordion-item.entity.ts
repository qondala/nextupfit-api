import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentAccordionEntity } from "../content.accordion.entity";



@Entity("content_accordion_item")
export class ContentAccordionItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "integer"})
  accordionId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column({type: "integer"})
  position: number;

  @ManyToOne(() => ContentAccordionEntity, (accordion) => accordion.items)
  accordion: ContentAccordionEntity;
}