import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { BaseUnitContainanceEnum } from "../types";


@Entity("base_unit")
export class BaseUnitEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ nullable: false })
  name: string;


  @Column({ nullable: false })
  abbreviation: string;


  @Column({
    type: "enum",
    enum: BaseUnitContainanceEnum,
    nullable: false,
    default: BaseUnitContainanceEnum.none
  })
  containance: BaseUnitContainanceEnum;


  @Column({ nullable: true })
  order?: number;


  @Column({ nullable: true, unique: true })
  code?: string;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
