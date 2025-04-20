import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { BaseUnitContainanceEnum } from "../types";


@Entity("base_unit")
export class BaseUnitEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "varchar", nullable: false })
  name: string;


  @Column({ type: "varchar", nullable: false })
  abbreviation: string;


  @Column({
    type: "enum",
    enum: BaseUnitContainanceEnum,
    nullable: false,
    default: BaseUnitContainanceEnum.none
  })
  containance: BaseUnitContainanceEnum;


  @Column({ type: "int", nullable: true })
  order?: number;

  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
