import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("program_workout_nutrient_burn")
export class ProgramWorkoutNutrientBurnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  baseWorkoutId: number;

  @Column()
  duration: number;

  @Column()
  durationUnitId: number;

  @Column()
  nutrientId: number;

  @Column()
  burnsNutrientQty: number;

  @Column()
  gymId: number;

  @Column()
  programId: number;

  @Column()
  programStepId: number;

  @Column()
  programStepActivityId: number;

  @Column()
  ownerUserId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
