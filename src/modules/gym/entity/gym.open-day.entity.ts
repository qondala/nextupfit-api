import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

import { BaseWeekDaysEnum } from "@app/module/base/types";


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
}
