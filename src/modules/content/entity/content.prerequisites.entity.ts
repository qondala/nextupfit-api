import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContentPrerequisitesItemEntity } from "./items";

@Entity("content_prerequisites")
export class ContentPrerequisitesEntity {
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

  @OneToMany(() => ContentPrerequisitesItemEntity, (item) => item.prerequisitesId)
  items: ContentPrerequisitesItemEntity[];
}
