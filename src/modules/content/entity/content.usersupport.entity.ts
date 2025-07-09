import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_usersupport")
export class ContentUsersupportEntity {
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

  @Column({ type: "integer" })
  supportArticleId: number;
}
