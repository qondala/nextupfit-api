import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

import { 
  BaseExerciseTargetEnum,
  BaseWorkoutDisciplineEnum } from "../types";


@Entity("base_workout")
export class BaseWorkoutEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({ type: "varchar", nullable: false })
  name: string;


  @Column({ type: "varchar", nullable: true })
  description?: string;


  @Column({
    type: "enum",
    enum: BaseExerciseTargetEnum,
    array: true,
    default: [BaseExerciseTargetEnum.cardio]
  })
  targets: BaseExerciseTargetEnum[];


  @Column({ type: "int", nullable: true })
  createdByUserId: number;


  @Column({ type: "enum", enum: BaseWorkoutDisciplineEnum, nullable: false  })
  discipline: BaseWorkoutDisciplineEnum;


  @Column({ type: "varchar", nullable: true })
  appleCode?: string;


  @Column({ type: "varchar", nullable: true })
  fitbitCode?: string;


  @Column({ type: "varchar", nullable: true })
  withingsCode?: string;


  @Column({ type: "varchar", nullable: true })
  imageUrl?: string;


  @Column({ type: "varchar", nullable: true })
  illustrationUrl?: string;


  @Column({ type: "varchar", nullable: true })
  videoUrl?: string;


  @Column({ type: "varchar", nullable: true, unique: true })
  code?: string;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
