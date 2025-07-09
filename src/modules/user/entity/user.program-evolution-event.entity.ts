import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {
  ProgramEvolutionEventTypeEnum,
  ProgramItemTypeEnum
} from "@app/module/program/types";


@Entity("user_program_evolution_event")
export class UserProgramEvolutionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: ProgramEvolutionEventTypeEnum,
  })
  event: ProgramEvolutionEventTypeEnum;

  @Column()
  userId: number;

  @Column()
  gymId: number;

  @Column()
  programItemId: number;

  @Column({
    type: "enum",
    enum: ProgramItemTypeEnum,
  })
  programItem: ProgramItemTypeEnum;

  @Column({ default: 0 })
  progressionPoints: number;

  @Column({ type: "numeric", precision: 3, scale: 2, default: 0 })
  progressionPercentage: number;

  @Column({ type: "numeric", precision: 3, scale: 2, default: 0 })
  totalProgressionPercentage: number;

  @Column({ default: 0 })
  totalProgressionPoints: number;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  iteration: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
