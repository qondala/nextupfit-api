import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { SocialReviewItemTypeEnum } from '../types';

@Entity('social_review')
export class SocialReviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment?: string;

  @Column({
    type: 'enum',
    enum: SocialReviewItemTypeEnum
  })
  itemType: SocialReviewItemTypeEnum;

  @Column()
  itemId: number;

  @Column()
  userId: number;

  @Column()
  easeOfUse: number;

  @Column()
  effectiveness: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
