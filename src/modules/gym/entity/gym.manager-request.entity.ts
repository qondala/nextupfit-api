import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


import { UserEntity } from '@app/module/user/entity';

@Entity('gym_manager_request')
export class GymManagerRequestEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  gymId: number;


  @Column({ nullable: false})
  applicantUserId: number;


  @Column({ nullable: true})
  letter?: string;


  @Column({ nullable: true})
  portfolioUrl?: string;


  @Column({ nullable: true})
  documentUrl?: string;


  @Column({ type: "boolean", nullable: true})
  favorite?: boolean;


  @Column({ type: "boolean", nullable: true})
  accepted?: boolean;


  @Column({ type: "boolean", nullable: true})
  rejected?: boolean;


  @Column({ type: "timestamp", nullable: true})
  acceptedDate?: Date;


  @Column({ type: "timestamp", nullable: true})
  rejectedDate: Date;


  @Column({ nullable: true })
  acceptedByGymManagerUserId: number;


  @Column({ nullable: true })
  rejectedByGymManagerUserId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'applicantUserId' })
  applicant: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
