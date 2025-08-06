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
import { SocialAdvertisementEntity } from ".";

@Entity({ name: "social_advertisement_interest" })
export class SocialAdvertisementInterestEntity {
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
  advertisementId: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @ManyToOne(
    () => SocialAdvertisementEntity,
    (advertisement) => advertisement.interests,
  )
  @JoinColumn({ name: "advertisementId", referencedColumnName: "id" })
  advertisement: SocialAdvertisementEntity;
}
