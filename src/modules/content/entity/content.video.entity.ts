import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_video")
export class ContentVideoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint" })
  contentId: number;

  @Column({ nullable: true })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  videoUrl: string;

  @Column({ default: false })
  displayTitle: boolean;
}
