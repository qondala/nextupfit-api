import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserInterestTypeEnum } from "@app/module/user/types";
import { ProgramStepActivityEntity } from ".";

@Entity({ name: "program_freetool_interest" })
export class ProgramFreetoolInterestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: UserInterestTypeEnum,
    enumName: "UserInterestTypeEnum",
  })
  interestType: UserInterestTypeEnum;

  @Column({ type: "bigint" })
  interestId: number;

  @Column({ type: "bigint" })
  freetoolId: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @ManyToOne(() => ProgramStepActivityEntity, (activity) => activity.interests)
  @JoinColumn({ name: 'freetoolId', referencedColumnName: 'id' })
  activity: ProgramStepActivityEntity;
}
