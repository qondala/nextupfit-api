import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { ProgramStepStatusEnum } from "../types";
import { ProgramEntity, ProgramStepActivityEntity } from ".";


@Entity("program_step")
export class ProgramStepEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  gymId: number;

  @Column()
  programId: number;

  @Column()
  ownerUserId: number;

  @Column({ nullable: true })
  iconUrl: string;

  @Column({
    type: "enum",
    enum: ProgramStepStatusEnum,
    default: ProgramStepStatusEnum.unpublished,
  })
  status: ProgramStepStatusEnum;

  @Column({ default: 0 })
  attendeesCount: number;

  @Column({ default: 0 })
  viewsCount: number;

  @Column({ type: "float", default: 0 })
  ratingsAvg: number;

  @Column({ default: 0 })
  ratingsCount: number;

  @Column({ default: 2 })
  duration: number;

  @Column({ default: 16 })
  durationUnitId: number;

  @Column({ default: 0 })
  difficultyLevel: number;

  @Column({ default: 0 })
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ProgramEntity, program => program.steps)
  @JoinColumn({ name: 'programId' })
  program: ProgramEntity;

  @OneToMany(() => ProgramStepActivityEntity, activity => activity.step)
  activities: ProgramStepActivityEntity[];
}
