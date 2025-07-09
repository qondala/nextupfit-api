import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ContentCarouselItemEntity } from "./items";



@Entity("content_carousel")
export class ContentCarouselEntity {
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

  @Column()
  mediaType: number;

  @OneToMany(() => ContentCarouselItemEntity, (item) => item.carouselId)
  items: ContentCarouselItemEntity[];
}