import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseWorkoutEntity, BaseEquipmentEntity, BaseUnitEntity } from ".";

@Entity("base_workout_equipment")
export class BaseWorkoutEquipmentEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ type: "integer", nullable: false })
  workoutId: number;

  @Column({ type: "integer", nullable: false })
  equipmentId: number;

  @Column({ type: "integer", nullable: true })
  quantity?: number;

  @Column({ type: "integer", nullable: true })
  quantityUnitId?: number;

  @Column({ type: "boolean", nullable: false, default: true })
  mandatory: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseWorkoutEntity)
  @JoinColumn({ name: "workoutId", referencedColumnName: "id" })
  workout: BaseWorkoutEntity;

  @ManyToOne(() => BaseEquipmentEntity)
  @JoinColumn({ name: "equipmentId", referencedColumnName: "id" })
  equipment: BaseEquipmentEntity;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "quantityUnitId", referencedColumnName: "id" })
  quantityUnit?: BaseUnitEntity;
}
