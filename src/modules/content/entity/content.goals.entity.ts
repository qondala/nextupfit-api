import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ContentGoalsItemEntity } from "./items";

@Entity("content_goals")
export class ContentGoalsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  contentId: number;

  @Column()
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ default: false })
  displayTitle: boolean;

  @OneToMany(() => ContentGoalsItemEntity, (item) => item.contentId)
  items: ContentGoalsItemEntity[];
}
