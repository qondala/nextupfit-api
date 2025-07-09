import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentCarouselEntity } from "../content.carousel.entity";



@Entity("content_carousel_item")
export class ContentCarouselItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "integer"})
  carouselId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  mediaUrl: string;

  @Column({type: "integer"})
  position: number;

  @ManyToOne(() => ContentCarouselEntity, (carousel) => carousel.items)
  carousel: ContentCarouselEntity;
}