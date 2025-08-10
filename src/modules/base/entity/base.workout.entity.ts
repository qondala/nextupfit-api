import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";

import {
  BaseExerciseTargetEnum,
  BaseWorkoutDisciplineEnum,
} from "../types";
import { BaseWorkoutMuscleEntity } from "./base.workout-muscle.entity";
import { BaseWorkoutHowtoPerformStepEntity } from "./base.workout-howto-perform-step.entity";
import { BaseWorkoutRecommendedRepetitionEntity } from "./base.workout-recommended-repetition.entity";
import { BaseWorkoutNutrientBurnEntity } from "./base.workout-nutrient-burn.entity";
import { BaseWorkoutEquipmentEntity } from "./base.workout-equipment.entity";

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
    default: [BaseExerciseTargetEnum.cardio],
  })
  targets: BaseExerciseTargetEnum[];

  @Column({ type: "bigint", nullable: true })
  createdByUserId: number;

  @Column({ type: "enum", enum: BaseWorkoutDisciplineEnum, nullable: false })
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

  @OneToMany(() => BaseWorkoutMuscleEntity, (workoutMuscle) => workoutMuscle.workout)
  muscles: BaseWorkoutMuscleEntity[];

  @OneToMany(() => BaseWorkoutHowtoPerformStepEntity, (howtoPerformStep) => howtoPerformStep.workout)
  howtoPerformSteps: BaseWorkoutHowtoPerformStepEntity[];

  @OneToMany(() => BaseWorkoutRecommendedRepetitionEntity, (recommendedRepetition) => recommendedRepetition.workout)
  recommendedRepetitions: BaseWorkoutRecommendedRepetitionEntity[];

  @OneToMany(() => BaseWorkoutNutrientBurnEntity, (burn) => burn.workout)
  burnsNutrients: BaseWorkoutNutrientBurnEntity[];

  @OneToMany(() => BaseWorkoutEquipmentEntity, (equipment) => equipment.workout)
  equipments: BaseWorkoutEquipmentEntity[];
}
