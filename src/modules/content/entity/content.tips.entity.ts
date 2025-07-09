import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContentTipsItemEntity } from "./items";

@Entity("content_tips")
export class ContentTipsEntity {
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

  @OneToMany(() => ContentTipsItemEntity, (item) => item.tipsId)
  items: ContentTipsItemEntity[];
}
