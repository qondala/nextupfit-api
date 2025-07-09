import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content_equipment_item")
export class ContentEquipmentItemEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "int" })
  baseEquipmentId: number;

  @Column({ type: "boolean", nullable: true })
  mandatory?: boolean;

  @Column({ type: "bigint" })
  contentEquipmentId: number;

  @Column({ type: "int", default: 0 })
  position: number;
}
