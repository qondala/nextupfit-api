import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { UserInterestTypeEnum } from "@app/module/user/types";

@Entity({ name: "user_interest" })
export class UserInterestEntity {
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
  userId: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;
}
