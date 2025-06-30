import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { ProgramItemTypeEnum } from "../types";
import { GymManagerEntity } from "@app/module/gym/entity";


@Entity("program_manager")
export class ProgramManagerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  itemType: ProgramItemTypeEnum;


  @Column({ nullable: false })
  itemId: number;


  @Column({ nullable: false })
  managerId: number;


  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: 'managerId' })
  manager: GymManagerEntity;


  @CreateDateColumn()
  createdAt: Date;
}
