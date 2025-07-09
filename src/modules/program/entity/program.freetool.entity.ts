import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

import {
  ProgramItemTypeEnum,
  ProgramItemCompositeDto,
} from '../types';

import { GymEntity, GymManagerEntity } from '@app/module/gym/entity';

@Entity('program_freetool')
export class ProgramFreetoolEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({
    type: 'enum',
    enum: ProgramItemTypeEnum,
  })
  itemType: ProgramItemTypeEnum;

  @Column({ type: 'bigint' })
  itemId: number;

  @Column({ type: 'bigint', nullable: true })
  managerId: number;

  @Column({ type: 'bigint', nullable: true })
  gymId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym: GymEntity;

  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: 'managerId' })
  manager: GymManagerEntity;

  // Transient field
  item: ProgramItemCompositeDto;
}
