import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProgramStepActivityStatusEnum } from "../types";
import { ProgramStepEntity } from "./program.step.entity";
import { ProgramStepActivityWorkingsessionEntity } from "./program.step-activity-workingsession.entity";


@Entity("program_step_activity")
export class ProgramStepActivityEntity {
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
  programStepId: number;

  @Column()
  ownerUserId: number;

  @Column({ nullable: true })
  iconUrl: string;

  @Column({
    type: "enum",
    enum: ProgramStepActivityStatusEnum,
    default: ProgramStepActivityStatusEnum.unpublished,
  })
  status: ProgramStepActivityStatusEnum;

  @Column({ default: 0 })
  points: number;

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

  @ManyToOne(() => ProgramStepEntity, step => step.activities)
  @JoinColumn({ name: 'programStepId' })
  step: ProgramStepEntity;

  @OneToMany(() => ProgramStepActivityWorkingsessionEntity, workingssession => workingssession.activity)
  workingssessions: ProgramStepActivityWorkingsessionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
