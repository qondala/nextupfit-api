import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { BaseBodyPartEnum } from "../types";


@Entity("base_muscle")
export class BaseMuscleEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "varchar", nullable: false })
  name: string;


  @Column({
    type: "enum",
    enum: BaseBodyPartEnum,
    nullable: false
  })
  bodyPart: BaseBodyPartEnum;


  @Column({ type: "varchar", nullable: false })
  iconUrl: string;


  @Column({ type: "varchar", nullable: false })
  order?: number;


  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
