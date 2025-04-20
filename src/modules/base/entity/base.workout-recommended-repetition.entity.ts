import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { BaseWorkoutAttendeeLevelEnum } from "../types";


@Entity("base_workout_recommended_repetition")
export class BaseWorkoutRecommendedRepetitionEntity {

  @PrimaryGeneratedColumn()
  id: number;


  @Column({
    type: "enum",
    enum: BaseWorkoutAttendeeLevelEnum,
    default: BaseWorkoutAttendeeLevelEnum.beginner
  })
  attendeeLevel: BaseWorkoutAttendeeLevelEnum;


  @Column({ type: "int", nullable: false })
  duration: number;


  @Column({ type: "int", nullable: false })
  durationUnitId: number;


  @Column({ type: "int", nullable: false })
  setCount: number;


  @Column({ type: "int", nullable: false })
  baseWorkoutId: number;


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
