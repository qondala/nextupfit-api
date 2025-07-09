import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ContentFaqItemEntity } from "./items";

/**
 * Entity representing a FAQ block inside the Content module.
 * Maps to table `content_faq`.
 */
@Entity("content_faq")
export class ContentFaqEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  contentId: number;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  displayTitle: boolean;

  @OneToMany(() => ContentFaqItemEntity, (item) => item.contentFaqId)
  items: ContentFaqItemEntity[];
}
