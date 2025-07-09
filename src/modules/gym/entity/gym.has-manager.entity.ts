import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";

import { GymManagerRoleEnum, GymManagerSpecialityEnum } from "../types";
import {
    GymEntity,
    GymManagerEntity,
} from "./";
import { GymManagerStatusEnum } from "../types/gym.manager-status.enum";

@Entity("gym_has_manager")
export class GymHasManagerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  gymId: number;

  @Column({ nullable: false })
  managerId: number;

  @Column({
    nullable: false,
    type: "enum",
    enum: GymManagerRoleEnum,
    default: GymManagerRoleEnum.manager
  })
  role: GymManagerRoleEnum;


  @Column({
    nullable: false,
    type: "enum",
    enum: GymManagerStatusEnum,
    default: GymManagerStatusEnum.active
  })
  status: GymManagerStatusEnum;

  @Column({ type: "timestamp", nullable: false })
  lastStatusUpdate: Date;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym: GymEntity;

  @ManyToOne(() => GymManagerEntity)
  @JoinColumn({ name: 'managerId' })
  manager: GymManagerEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
