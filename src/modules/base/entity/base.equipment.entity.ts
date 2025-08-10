import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseEquipmentUsageEntity } from ".";

@Entity("base_equipment")
export class BaseEquipmentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "integer", nullable: false })
  usageId: number;

  @Column({ type: "varchar", nullable: true })
  imageUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseEquipmentUsageEntity)
  @JoinColumn({ name: "usageId", referencedColumnName: "id" })
  usage: BaseEquipmentUsageEntity;
}
