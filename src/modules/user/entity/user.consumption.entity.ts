
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { BaseConsumptionProgramEnum } from "@app/module/base/types";
import { BaseTimeFormatEnum } from "@app/module/base/types";
import { UserConsumptionItemEntity } from ".";


@Entity("user_consumption")
export class UserConsumptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isCasual: boolean;

  @Column()
  isRegular: boolean;

  @Column()
  day: string;

  @Column()
  hourBegin: number;

  @Column()
  minuteBegin: number;

  @Column()
  hourEnd: number;

  @Column()
  minuteEnd: number;

  @Column({type: "enum", enum: BaseTimeFormatEnum})
  timeFormat: BaseTimeFormatEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
  
  @Column({type: "enum", enum: BaseConsumptionProgramEnum})
  typeConsumption: BaseConsumptionProgramEnum;
  
  @Column({type: "integer"})
  contentConsumptionId: number;

  @Column({type: "integer"})
  userId: number;

  @OneToMany(() => UserConsumptionItemEntity, (item) => item.userConsumptionId)
  items: UserConsumptionItemEntity[];
}
