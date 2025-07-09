import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContentOrderedlistItemEntity } from "./items";

@Entity("content_orderedlist")
export class ContentOrderedlistEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "bigint", nullable: false })
  contentId: number;

  @Column({ type: "varchar", nullable: true })
  title?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "boolean", nullable: true })
  displayTitle?: boolean;

  @OneToMany(() => ContentOrderedlistItemEntity, (item) => item.orderedlistId)
  items: ContentOrderedlistItemEntity[];
}
