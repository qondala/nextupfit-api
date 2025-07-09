import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import {
  ContentTextColorEnum,
  ContentTextStyleEnum,
} from "@app/module/content/types";

@Entity("content_orderedlist_item")
export class ContentOrderedlistItemEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "bigint" })
  orderedlistId: number;

  @Column({ type: "varchar", nullable: true })
  title?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "varchar", nullable: true })
  imageUrl?: string;

  @Column({
    type: "enum",
    enum: ContentTextColorEnum,
    nullable: true,
  })
  textColor?: ContentTextColorEnum;

  @Column({
    type: "enum",
    enum: ContentTextStyleEnum,
    array: true,
    nullable: true,
  })
  textStyles?: ContentTextStyleEnum[];

  @Column({ type: "int", default: 0 })
  position: number;
}
