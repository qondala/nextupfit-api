import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from '@app/module/user/entity';
import { GymManagerEntity } from '.';

@Entity('gym_manager_follower')
export class GymManagerFollowerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  managerId: number;

  @Column({ nullable: false })
  managerUserId: number;

  @Column({ nullable: false })
  followerUserId: number;


  @Column({
    type: "timestamp",
    nullable: true
  })
  acceptedDate?: Date;


  @Column({
    type: "timestamp",
    nullable: true
  })
  stoppedDate?: Date;


  @Column({
    type: "timestamp",
    nullable: true
  })
  blockedDate?: Date;


  @Column({
    type: "timestamp",
    nullable: true
  })
  rejectedDate?: Date;


  @Column({
    type: "boolean",
    nullable: true,
    default: false
  })
  accepted?: boolean;


  @Column({
    type: "boolean",
    nullable: true,
    default: false
  })
  blocked?: boolean;


  @Column({
    type: "boolean",
    nullable: true,
    default: false
  })
  stopped?: boolean;

  @Column({
    type: "boolean",
    nullable: true,
    default: false
  })
  rejected?: boolean;

  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: 'managerId' })
  manager: GymManagerEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'followerUserId' })
  follower: UserEntity;
}
