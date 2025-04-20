import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SocialNotificationTypeEnum } from '../types';

@Entity('social_notification')
export class SocialNotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  programId?: number;

  @Column({ nullable: true })
  workoutId?: number;

  @Column({ nullable: true })
  workingsessionId?: number;

  @Column({ nullable: true })
  programActivityId?: number;

  @Column({ nullable: true })
  programActivityWorkingsessionId?: number;

  @Column({ nullable: true })
  achievementId?: number;

  @Column({ nullable: true })
  badgeId?: number;

  @Column({ nullable: true })
  challengeId?: number;

  @Column({ nullable: true })
  challengeWorkingsessionId?: number;

  @Column({ nullable: true })
  challengeActivityId?: number;

  @Column({ nullable: true })
  challengeActivityWorkingsessionId?: number;

  @Column({ nullable: true })
  teamId?: number;

  @Column({ nullable: true })
  teamWorkingsessionId?: number;

  @Column({ nullable: true })
  teamActivityId?: number;

  @Column({ nullable: true })
  teamActivityWorkingsessionId?: number;

  @Column()
  isRead: boolean;

  @Column({
    type: 'enum',
    enum: SocialNotificationTypeEnum
  })
  type: SocialNotificationTypeEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
