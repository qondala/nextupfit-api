import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";

import { BaseWeekDaysEnum } from "@app/module/base/types";
import { GymEntity } from "./gym.entity";


@Entity("gym_open_day")
export class GymOpenDayEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  gymId: number;

  @Column({
    type: "enum",
    enum: BaseWeekDaysEnum,
    nullable: false
  })
  day: BaseWeekDaysEnum;

  @Column({ nullable: false })
  hourFrom: number;

  @Column({ nullable: false })
  minuteFrom: number;

  @Column({ nullable: false })
  hourTo: number;

  @Column({ nullable: false })
  minuteTo: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => GymEntity)
  @JoinColumn({ name: 'gymId' })
  gym: GymEntity;
}
