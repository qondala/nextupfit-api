import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SocialUpdateEntity } from './social.update.entity';

@Entity('social_update_content')
export class SocialUpdateContentEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ name: 'socialUpdateId', type: 'bigint' })
  socialUpdateId: number;

  @Column({ name: 'contentId', type: 'bigint' })
  contentId: number;

  // Relations
  @ManyToOne(() => SocialUpdateEntity)
  @JoinColumn({ name: 'socialUpdateId' })
  socialUpdate: SocialUpdateEntity;
}
