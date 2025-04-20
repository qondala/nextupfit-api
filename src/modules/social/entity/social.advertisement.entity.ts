import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SocialAdvertisementActionEnum } from '../types';

@Entity('social_advertisement')
export class SocialAdvertisementEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  videoUrl?: string;

  @Column({ nullable: true })
  imageUrl?: string;

  @Column({
    type: 'enum',
    enum: SocialAdvertisementActionEnum
  })
  action: SocialAdvertisementActionEnum;

  @Column({ nullable: true })
  actionLink?: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
