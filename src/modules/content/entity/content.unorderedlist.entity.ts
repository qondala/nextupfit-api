import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_unorderedlist")
export class ContentUnorderedlistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", nullable: true })
  contentId: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ default: false })
  displayTitle: boolean;
}
