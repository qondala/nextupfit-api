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
import { ProgramStepActivityWorkingsessionPracticeEntity } from ".";

@Entity({ name: "program_challenge_interest" })
export class ProgramChallengeInterestEntity {
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
  workingSessionPracticeId: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @ManyToOne(() => ProgramStepActivityWorkingsessionPracticeEntity, (practice) => practice.interests)
  @JoinColumn({ name: "workingSessionPracticeId", referencedColumnName: "id" })
  practice: ProgramStepActivityWorkingsessionPracticeEntity;
}
