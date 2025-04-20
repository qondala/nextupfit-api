import { UserEntity } from '@app/module/user/entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('gym_manager_follower')
export class GymManagerFollowerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  managerUserId: number;


  @Column({ nullable: false })
  followerUserId: number;


  @Column({ type: "timestamp", nullable: true })
  acceptedDate?: Date;


  @Column({ type: "timestamp", nullable: true })
  stoppedDate?: Date;


  @Column({ type: "timestamp", nullable: true })
  blockedDate?: Date;


  @Column({ type: "boolean", nullable: true })
  accepted?: boolean;


  @Column({ type: "boolean", nullable: true })
  blocked?: boolean;


  @Column({ type: "boolean", nullable: true })
  stopped?: boolean;


  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'managerUserId' })
  manager: UserEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'followerUserId' })
  follower: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
