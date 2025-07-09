import { BaseConsumptionProgramEnum } from "@app/module/base/types";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("user_consumption_item")
export class UserConsumptionItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemType: BaseConsumptionProgramEnum;

  @Column()
  itemId: number;

  @Column()
  userConsumptionId: number;

  @Column()
  contentConsumptionItemId: number;

  @Column()
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
