import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";

import { GymEntity, GymManagerEntity } from "@app/module/gym/entity";

import { ProgramStepActivityEntity, ProgramFreetoolInterestEntity } from "./";

@Entity("program_freetool")
export class ProgramFreetoolEntity {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ type: "bigint" })
  activityId: number;

  @Column({ type: "bigint", nullable: true })
  managerId: number;

  @Column({ type: "bigint", nullable: true })
  gymId: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: "gymId" })
  gym: GymEntity;

  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: "managerId" })
  manager: GymManagerEntity;

  @ManyToOne(() => ProgramStepActivityEntity)
  @JoinColumn({ name: "activityId" })
  activity: ProgramStepActivityEntity;

  @OneToMany(
    () => ProgramFreetoolInterestEntity,
    (interest) => interest.freetool,
  )
  interests: ProgramFreetoolInterestEntity[];
}
