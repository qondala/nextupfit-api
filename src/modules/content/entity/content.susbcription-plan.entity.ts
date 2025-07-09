import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { BaseSubscriptionPlanItemEnum } from "@app/module/base/types";
import { ContentSusbcriptionPlanItemEntity } from "./items";


@Entity("content_susbcription_plan")
export class ContentSusbcriptionPlanEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ name: "itemType" })
  itemType: BaseSubscriptionPlanItemEnum;

  @Column({ name: "itemId", type: "bigint" })
  itemId: number;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ name: "displayTitle", type: "boolean", default: true })
  displayTitle: boolean;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updatedAt" })
  updatedAt: Date;

  @Column({ name: "createdByUserId", type: "bigint", default: 0 })
  createdByUserId: number;

  @Column({ name: "createdByManagerId", type: "bigint", default: 0 })
  createdByManagerId: number;

  @OneToMany(() => ContentSusbcriptionPlanItemEntity, (item) => item.plan)
  items: ContentSusbcriptionPlanItemEntity[];
}
