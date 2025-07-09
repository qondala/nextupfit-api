import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ContentEquipmentItemEntity } from "./items";

@Entity("content_equipment")
export class ContentEquipmentEntity {
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

  @OneToMany(() => ContentEquipmentItemEntity, (item) => item.contentEquipmentId)
  items: ContentEquipmentItemEntity[];
}
