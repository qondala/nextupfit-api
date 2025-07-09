import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import {
  ContentTextColorEnum,
  ContentTextStyleEnum,
} from "@app/module/content/types";

@Entity("content_prerequisites_item")
export class ContentPrerequisitesItemEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "bigint" })
  prerequisitesId: number;

  @Column({ type: "varchar", nullable: true })
  name?: string;

  @Column({ type: "varbit", nullable: true })
  description?: string;

  @Column({ type: "int", default: 0 })
  position: number;

  @Column({ type: "smallint", default: 0 })
  importance: number;

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
}
