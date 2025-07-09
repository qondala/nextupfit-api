import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import {
  SocialActorEnum,
  SocialUpdateTypeEnum,
  SocialUpdatePrivacyEnum
} from '../types';
import { UserEntity } from '@app/module/user/entity';
import { GymManagerEntity } from '@app/module/gym/entity';

@Entity('social_update')
export class SocialUpdateEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  authorUserId: number;

  @Column({ type: 'bigint', nullable: true })
  authorManagerId: number;

  @Column({
    type: 'enum',
    enum: SocialActorEnum,
  })
  socialActorType: SocialActorEnum;

  @Column({ type: 'bigint' })
  socialActorId: number;

  @Column({
    type: 'enum',
    enum: SocialUpdateTypeEnum,
  })
  socialUpdateType: SocialUpdateTypeEnum;

  @Column({
    type: 'enum',
    enum: SocialUpdatePrivacyEnum,
    default: SocialUpdatePrivacyEnum.public,
  })
  privacy: SocialUpdatePrivacyEnum;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updateAt: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'authorUserId' })
  authorUser: UserEntity;

  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: 'authorManagerId' })
  authorManager: GymManagerEntity;
}
