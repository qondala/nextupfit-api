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
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
