import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import { GymSpecialityEnum, GymVerifiedStatusEnum } from '../types';

import {
  GymManagerEntity,
  GymMembershipPlanEntity,
  GymSpecializedInWorkoutEntity
} from './';
import { UserEntity } from '@app/module/user/entity';

@Entity('gym')
export class GymEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ nullable: false })
  createdByUserId: number;


  @Column({ nullable: false })
  name: string;


  @Column({ nullable: true })
  logoUrl?: string;


  @Column({ nullable: true })
  coverUrl?: string;


  @Column({ nullable: true })
  address: string;

  
  @Column({ nullable: true })
  email: string;


  @Column({ nullable: true })
  facebookPageUrl?: string;


  @Column({ nullable: true })
  twitterPageUrl?: string;


  @Column({
    nullable: true
  })
  linkedinPageUrl?: string;


  @Column({ nullable: true })
  youtubePageUrl?: string;


  @Column({ nullable: true })
  tiktokPageUrl?: string;


  @Column({ nullable: true })
  phoneLine1?: string;


  @Column({ nullable: true })
  phoneLine2?: string;

  @Column({ nullable: true })
  moto?: string;

  @Column({ nullable: true })
  followersCount?: number;

  @Column({
    type: "enum",
    enum: GymSpecialityEnum,
    nullable: true
  })
  speciality: GymSpecialityEnum;


  @Column({ nullable: true })
  stripeAccountId?: string;

  @Column({ nullable: true })
  countryId?: number;

  @Column({ nullable: true })
  stateId?: number;

  @Column({ nullable: true })
  cityId: number;

  @Column({ nullable: true })
  membersCount?: number;

  @Column({
    type: "enum",
    enum: GymVerifiedStatusEnum,
    nullable: true
  })
  verifiedStatus: GymVerifiedStatusEnum

  @Column({ nullable: true })
  viewsCount: number;

  @Column({ nullable: true })
  ratingsAvg: number;

  @Column({ nullable: true })
  ratingsCount: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'createdByUserId' })
  owner: UserEntity;

  @OneToMany(() => GymManagerEntity, manager => manager.gym)
  managers: GymManagerEntity[];

  @OneToMany(() => GymMembershipPlanEntity, plan => plan.gym)
  membershipPlans: GymMembershipPlanEntity[];

  @OneToMany(() => GymSpecializedInWorkoutEntity, specializedWorkout => specializedWorkout.gym)
  specializedWorkouts: GymSpecializedInWorkoutEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
