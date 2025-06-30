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

import { GymEntity } from "@app/module/gym/entity";

import { ProgramStatusEnum, ProgramTypeEnum } from "../types";
import { ProgramStepEntity } from ".";


@Entity("program")
export class ProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


  @Column()
  gymId: number;


  @Column()
  ownerUserId: number;


  @Column({
    type: "enum",
    enum: ProgramTypeEnum,
    default: ProgramTypeEnum.nutrition,
  })
  type: ProgramTypeEnum;


  @Column({
    type: "enum",
    enum: ProgramStatusEnum,
    default: ProgramStatusEnum.unpublished,
  })
  status: ProgramStatusEnum;


  @Column({ nullable: true })
  iconUrl: string;


  @Column({ nullable: true })
  coverUrl: string;


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


  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym: GymEntity;


  @OneToMany(() => ProgramStepEntity, step => step.program)
  steps: ProgramStepEntity[];


  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
