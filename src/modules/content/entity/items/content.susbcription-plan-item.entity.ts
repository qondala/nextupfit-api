import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { ContentSusbcriptionPlanEntity } from "..";

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

  @Column({ type: "boolean", default: false })
  highlight: boolean;

  @Column({ type: "boolean", default: false })
  strike: boolean;

  @Column({ nullable: true })
  icon?: string;

  @Column({ type: "boolean", default: false })
  italic: boolean;

  @Column({ type: "boolean", default: false })
  bold: boolean;

  @ManyToOne(() => ContentSusbcriptionPlanEntity, (plan) => plan.items)
  @JoinColumn({ name: "contentSubscriptionPlanId" })
  plan: ContentSusbcriptionPlanEntity;
}
