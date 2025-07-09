import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ContentSusbcriptionPlanEntity } from "..";

import {
  ContentTextColorEnum,
  ContentTextStyleEnum,
} from "@app/module/content/types";

@Entity("content_susbcription_plan_item")
export class ContentSusbcriptionPlanItemEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ name: "contentSubscriptionPlanId", type: "bigint" })
  contentSubscriptionPlanId: number;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ name: "displayDescription", type: "boolean", default: false })
  displayDescription: boolean;

  @Column({ nullable: true })
  icon?: string;


  @Column({
    type: "enum",
    enum: ContentTextStyleEnum,
    array: true,
    default: [ContentTextStyleEnum.none],
    nullable: true
  })
  textStyles: ContentTextStyleEnum[];

  @Column({
    type: "enum",
    enum: ContentTextColorEnum,
    nullable: true,
    default: ContentTextColorEnum.default,
  })
  textColor: ContentTextColorEnum;

  @ManyToOne(() => ContentSusbcriptionPlanEntity, (plan) => plan.items)
  @JoinColumn({ name: "contentSubscriptionPlanId" })
  plan: ContentSusbcriptionPlanEntity;
}
