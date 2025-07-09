import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { GymEntity, GymMembershipPlanEntity } from './';
import { UserEntity } from '@app/module/user/entity';
import { GymMembershipStatusEnum } from '../types';


@Entity('gym_membership')
export class GymMembershipEntity {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ nullable: true })
  gymId: number;


  @Column({ nullable: false })
  memberUserId: number;

  @Column({ nullable: false })
  gymMembershipPlanId: number;

  @Column({ type: "timestamp", nullable: true, default: new Date() })
  startedDate?: Date;


  @Column({
    type: "enum",
    enum: GymMembershipStatusEnum,
    nullable: false,
  })
  membershipStatus: GymMembershipStatusEnum;

  @Column({ type: "boolean", nullable: true })
  isFavorite?: boolean;

  @Column({ type: "timestamp", nullable: true })
  lastStatusUpdate?: Date;

  @ManyToOne(() => GymMembershipPlanEntity)
  @JoinColumn({ name: 'gymMembershipPlanId' })
  membershipPlan: GymMembershipPlanEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'memberUserId' })
  member: UserEntity;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym: GymEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
