import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseWorkoutAttendeeLevelEnum } from "../types";
import { BaseUnitEntity, BaseWorkoutEntity } from ".";

@Entity("base_workout_recommended_repetition")
export class BaseWorkoutRecommendedRepetitionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: BaseWorkoutAttendeeLevelEnum,
    default: BaseWorkoutAttendeeLevelEnum.beginner,
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

  @ManyToOne(() => BaseWorkoutEntity, (workout) => workout.recommendedRepetitions)
  @JoinColumn({ name: "baseWorkoutId", referencedColumnName: "id" })
  workout: BaseWorkoutEntity;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "durationUnitId", referencedColumnName: "id" })
  durationUnit: BaseUnitEntity;
}
