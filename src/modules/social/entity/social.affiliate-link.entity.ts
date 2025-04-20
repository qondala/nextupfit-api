import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('social_affiliate_link')
export class SocialAffiliateLinkEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  generatedLink: string;

  @Column()
  userId: number;

  @Column()
  programId: number;

  @Column({ nullable: true })
  workoutId?: number;

  @Column({ nullable: true })
  workingsessionId?: number;

  @Column({ nullable: true })
  programActivityId?: number;

  @Column({ nullable: true })
  programActivityWorkingsessionId?: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
