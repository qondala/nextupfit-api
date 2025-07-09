import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_instructions")
export class ContentInstructionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer", nullable: true })
  contentId?: number;

  @Column({ nullable: true })
  title?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ default: false })
  displayTitle?: boolean;
}
