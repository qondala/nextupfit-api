import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_information")
export class ContentInformationEntity {
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
}
