import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { BaseSchedulableEnum } from "@app/module/base/types";


@Entity("user_schedule")
export class UserScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  itemId: number;

  @Column({ type: "enum", enum: BaseSchedulableEnum })
  itemType: BaseSchedulableEnum;

  @Column({ nullable: false })
  expectedDatetime: Date;

  @Column({ nullable: false })
  useReminder: boolean;

  @Column({ nullable: false })
  remindBeforeMinutes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
