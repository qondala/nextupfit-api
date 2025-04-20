import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { GymVerifiedStatusEnum } from "../types";

@Entity("gym_manager_overview")
export class GymManagerOverviewEntity {
  
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ nullable: false })
  managerUserId: number;


  @Column({ nullable: true })
  bio?: string;


  @Column({ nullable: true })
  text?: string;


  @Column({ nullable: true })
  coverUrl?: string;


  @Column({ nullable: true })
  address: string;

  
  @Column({ nullable: false })
  email: string;


  @Column({ nullable: true })
  facebookPageUrl?: string;


  @Column({ nullable: true })
  twitterPageUrl?: string;


  @Column({ nullable: true })
  linkedinPageUrl?: string;


  @Column({ nullable: true })
  youtubePageUrl?: string;


  @Column({ nullable: true })
  tiktokPageUrl?: string;


  @Column({ nullable: true })
  phone?: string;


  @Column({ nullable: true })
  followersCount?: number;


  @Column({ nullable: true })
  stripeAccountId?: string;


  @Column({ nullable: true })
  countryId?: number;


  @Column({ nullable: true })
  stateId?: number;


  @Column({ nullable: true })
  cityId: number;


  @Column({ nullable: true })
  attendeesCount?: number;


  @Column({
    type: "enum",
    enum: GymVerifiedStatusEnum,
    nullable: true
  })
  verifiedStatus: GymVerifiedStatusEnum


  @Column({ type: "timestamp", nullable: true })
  createdDate: Date;


  @Column({ nullable: true })
  experiences: string;
  

  @Column({ nullable: true })
  viewsCount: number;


  @Column({ nullable: true })
  ratingsAvg: number;


  @Column({ nullable: true })
  ratingsCount: number;


  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
