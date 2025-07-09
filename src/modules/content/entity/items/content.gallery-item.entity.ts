import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";
import { ContentGalleryEntity } from "../";

@Entity("content_gallery_item")
export class ContentGalleryItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "bigint", nullable: false})
  contentGalleryId: number;

  @Column({type: "text", nullable: false})
  description: string;

  @Column({type: "text", nullable: false})
  mediaurl: string;

  @Column({type: "integer", nullable: true, default: 0})
  position: number;

  @ManyToOne(() => ContentGalleryEntity, (gallery) => gallery.items)
  contentGallery: ContentGalleryEntity;
}
