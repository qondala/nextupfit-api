import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import {
  ProgramItemTypeEnum,
  ProgramItemCompositeDto,
} from "@app/module/program/types";

import { GymEntity } from "./gym.entity";
import { GymManagerEntity } from ".";

@Entity("gym_has_program")
export class GymHasProgramEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ type: "bigint" })
  gymId: number;

  @Column({
    type: "enum",
    enum: ProgramItemTypeEnum,
  })
  itemType: ProgramItemTypeEnum;

  @Column({ type: "bigint" })
  itemId: number;

  @Column({ type: "bigint" })
  owerManagerId: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: "gymId" })
  gym: GymEntity;

  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: "owerManagerId" })
  manager: GymManagerEntity;

  // Transient field
  item: ProgramItemCompositeDto;
}
