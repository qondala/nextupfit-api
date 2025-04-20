import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { BaseHighlightColorEnum } from "../types";


@Entity("base_workout_howto_perform_step")
export class BaseWorkoutHowtoPerformStepEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "varchar", nullable: false })
  description: string;


  @Column({ type: "varchar", nullable: true })
  illustrationUrl?: string;


  @Column({
    type: "enum",
    enum: BaseHighlightColorEnum,
    nullable: true,
    default: BaseHighlightColorEnum.none
  })
  highlight?: BaseHighlightColorEnum;


  @Column({ type: "int", nullable: false })
  baseWorkoutId: number;


  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;


  @Column({ type: "int", nullable: true })
  order?: number;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
