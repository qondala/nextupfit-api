import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_image")
export class ContentImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  contentId: number;

  @Column({ nullable: true })
  title?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ default: false })
  displayTitle?: boolean;

  @Column({ type: "integer" })
  imageUrl: number;

  @Column({ type: "integer", nullable: true })
  height?: number;

  @Column({ type: "integer", nullable: true })
  width?: number;
}
