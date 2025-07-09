import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ContentConsumptionItemEntity } from "./items";
import { BaseConsumptionProgramEnum } from "@app/module/base/types";


@Entity("content_consumption")
export class ContentConsumptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "integer"})
  contentId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  displayTitle: boolean;

  @Column({type: "enum", enum: BaseConsumptionProgramEnum})
  typeConsumption: BaseConsumptionProgramEnum;

  @OneToMany(() => ContentConsumptionItemEntity, (item) => item.consumptionId)
  items: ContentConsumptionItemEntity[];
}
