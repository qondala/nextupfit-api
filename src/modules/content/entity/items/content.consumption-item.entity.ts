import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ContentConsumptionEntity } from "..";
import { BaseConsumptionItemTypeEnum } from "@app/module/base/types";


@Entity("content_consumption_item")
export class ContentConsumptionItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "integer"})
  consumptionId: number;

  @Column({type: "enum", enum: BaseConsumptionItemTypeEnum})
  itemType: BaseConsumptionItemTypeEnum;

  @Column({type: "integer"})
  itemId: number;

  @Column({type: "integer"})
  quantity: number;

  @Column({type: "integer"})
  quantityUnitId: number;

  @Column({type: "integer"})
  position: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => ContentConsumptionEntity, (consumption) => consumption.items)
  consumption: ContentConsumptionEntity;
}