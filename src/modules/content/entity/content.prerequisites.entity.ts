import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_prerequisites")
export class ContentPrerequisitesEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "bigint", nullable: true })
  contentId?: number;

  @Column({ type: "varchar", nullable: true })
  title?: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "boolean", nullable: true })
  displayTitle?: boolean;
}
