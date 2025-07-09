import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

/**
 * Entity representing a single FAQ item that belongs to a FAQ block inside the Content module.
 *
 * Table name: content_faq_item
 */
@Entity("content_faq_item")
export class ContentFaqItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  contentFaqId: number;

  @Column()
  question: string;

  @Column({ type: "text" })
  answer: string;
}
