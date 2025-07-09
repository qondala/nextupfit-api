import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_warning")
export class ContentWarningEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint" })
  contentId: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ default: false })
  displayTitle: boolean;
}
