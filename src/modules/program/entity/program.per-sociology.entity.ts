import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";

import { ProgramItemTypeEnum } from "../types";
import { BaseSociologyEntity } from "@app/module/base/entity";


@Entity("program_per_sociology")
export class ProgramPerSociologyEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  itemType: ProgramItemTypeEnum;


  @Column({ nullable: false })
  itemId: number;


  @Column({ nullable: false })
  baseSociologyId: number;

  @ManyToOne(() => BaseSociologyEntity)
  @JoinColumn({ name: 'baseSociologyId' })
  sociology: BaseSociologyEntity;


  @CreateDateColumn()
  createdAt: Date;
}
