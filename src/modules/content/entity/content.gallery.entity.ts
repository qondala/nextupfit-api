import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import { ContentLayoutEnum } from "../types";
import { ContentGalleryItemEntity } from "./items";

@Entity("content_gallery")
export class ContentGalleryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "bigint", nullable: false})
  contentId: number;

  @Column({type: "varchar", nullable: true})
  title: string;

  @Column({type: "text", nullable: true})
  description: string;

  @Column({type: "boolean", nullable: true})
  displayTitle: boolean;

  @Column({type: "enum", enum: ContentLayoutEnum, nullable: true})
  layout: ContentLayoutEnum;

  @OneToMany(() => ContentGalleryItemEntity, (item) => item.contentGalleryId)
  items: ContentGalleryItemEntity[];
}
