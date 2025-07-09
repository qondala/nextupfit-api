import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import {
  ContentTextColorEnum,
  ContentTextStyleEnum,
} from "@app/module/content/types";

@Entity("content_unorderedlist_item")
export class ContentUnorderedlistItemEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "bigint" })
  unorderedlistId: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({
    type: "enum",
    enum: ContentTextStyleEnum,
    array: true,
    default: [ContentTextStyleEnum.none],
    nullable: true,
  })
  textStyles: ContentTextStyleEnum[];

  @Column({
    type: "enum",
    enum: ContentTextColorEnum,
    nullable: true,
    default: ContentTextColorEnum.default,
  })
  textColor: ContentTextColorEnum;
}
