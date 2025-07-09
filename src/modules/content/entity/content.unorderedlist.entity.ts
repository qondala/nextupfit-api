import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContentUnorderedlistItemEntity } from "./items";

@Entity("content_unorderedlist")
export class ContentUnorderedlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", nullable: false })
  contentId: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ default: false })
  displayTitle: boolean;

  @OneToMany(() => ContentUnorderedlistItemEntity, (item) => item.unorderedlistId)
  items: ContentUnorderedlistItemEntity[];
}
