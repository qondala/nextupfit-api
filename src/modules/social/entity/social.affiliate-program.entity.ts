import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('social_affiliate_program')
export class SocialAffiliateProgramEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  commissionRate: number;

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
