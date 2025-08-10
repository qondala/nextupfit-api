import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseMuscleEntity, BaseWorkoutEntity } from ".";

@Entity("base_workout_muscle")
export class BaseWorkoutMuscleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer", nullable: false })
  workoutId: number;

  @Column({ type: "integer", nullable: false })
  muscleId: number;

  @ManyToOne(() => BaseWorkoutEntity)
  @JoinColumn({ name: "workoutId", referencedColumnName: "id" })
  workout: BaseWorkoutEntity;

  @ManyToOne(() => BaseMuscleEntity)
  @JoinColumn({ name: "muscleId", referencedColumnName: "id" })
  muscle: BaseMuscleEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
