import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BaseWorkoutEntity } from '@app/module/base/entity';
import { GymEntity } from './';

@Entity('gym_specialized_in_workout')
export class GymSpecializedInWorkoutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'gymId' })
  gymId: number;

  @Column({ name: 'workoutId' })
  workoutId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BaseWorkoutEntity)
  @JoinColumn({ name: 'workoutId' })
  workout: BaseWorkoutEntity;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym: GymEntity
}
