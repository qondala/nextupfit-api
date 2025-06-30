import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

import { ProgramItemTypeEnum } from "../types";


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


  @CreateDateColumn()
  createdAt: Date;
}
