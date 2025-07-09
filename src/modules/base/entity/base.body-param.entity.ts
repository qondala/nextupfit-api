import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseUnitEntity } from ".";


@Entity("base_body_param")
export class BaseBodyParamEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "varchar", nullable: false })
  name: string;


  @Column({ type: "varchar", nullable: true })
  description?: string;


  @Column({ type: "int", nullable: true })
  unitId?: number;


  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;


  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: 'unitId' })
  unit: BaseUnitEntity;
}
