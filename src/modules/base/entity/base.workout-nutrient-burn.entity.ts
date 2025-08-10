import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BaseNutrientEntity, BaseUnitEntity, BaseWorkoutEntity } from ".";

@Entity("base_workout_nutrient_burn")
export class BaseWorkoutNutrientBurnEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "bigint", nullable: false })
  baseWorkoutId: number;

  @Column({ type: "integer", nullable: false })
  duration: number;

  @Column({ type: "integer", nullable: false })
  durationUnitId: number;

  @Column({ type: "integer", nullable: false })
  nutrientId: number;

  @Column({ type: "decimal", nullable: false })
  burnsNutrientQty: number;

  @Column({ type: "integer", nullable: false })
  burnsNutrientQtyUnitId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "durationUnitId", referencedColumnName: "id" })
  durationUnit: BaseUnitEntity;

  @ManyToOne(() => BaseUnitEntity)
  @JoinColumn({ name: "burnsNutrientQtyUnitId", referencedColumnName: "id" })
  burnsNutrientQtyUnit: BaseUnitEntity;

  @ManyToOne(() => BaseNutrientEntity)
  @JoinColumn({ name: "nutrientId", referencedColumnName: "id" })
  nutrient: BaseNutrientEntity;

  @ManyToOne(() => BaseWorkoutEntity)
  @JoinColumn({ name: "baseWorkoutId", referencedColumnName: "id" })
  workout: BaseWorkoutEntity;
}
