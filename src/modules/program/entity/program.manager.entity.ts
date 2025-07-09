import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { ProgramItemTypeEnum } from "../types";
import { GymEntity, GymManagerEntity } from "@app/module/gym/entity";


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

  @Column({ nullable: false })
  managerUserId: number;

  @Column({ nullable: false })
  gymId: number;

  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: 'managerId' })
  manager: GymManagerEntity;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym: GymEntity;

  @CreateDateColumn()
  createdAt: Date;
}
