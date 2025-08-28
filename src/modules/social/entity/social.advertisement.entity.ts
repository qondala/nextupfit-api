import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { SocialAdvertisementActionEnum } from "../types";
import { ContentEntity } from "@app/module/content/entity";

import { SocialAdvertisementInterestEntity } from ".";

@Entity("social_advertisement")
export class SocialAdvertisementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  actionProgramId: number;

  @Column()
  actionGymId: number;

  @Column()
  actionManagerId: number;

  @Column({
    type: "enum",
    enum: SocialAdvertisementActionEnum,
  })
  action: SocialAdvertisementActionEnum;

  @Column({ nullable: true })
  actionLink?: string;

  @Column()
  contentId: number;

  @Column()
  createdByManagerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => ContentEntity)
  @JoinColumn({ name: "contentId", referencedColumnName: "id" })
  content: ContentEntity;

  @OneToMany(
    () => SocialAdvertisementInterestEntity,
    (interest) => interest.advertisement,
  )
  interests: SocialAdvertisementInterestEntity[];
}
