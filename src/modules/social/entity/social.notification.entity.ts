import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

import {
  SocialNotificationTypeEnum,
  SocialNotificationPayload
} from "../types";

@Entity("social_notification")
export class SocialNotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "user_id", 
    type: "integer"
  })
  userId: number;

  @Column({
    type: "enum",
    enum: SocialNotificationTypeEnum,
  })
  type: SocialNotificationTypeEnum;

  @Column({
    name: "title", 
    type: "text"
  })
  title: string;

  @Column({
    name: "body", 
    type: "text"
  })
  body: string;

  @Column({
    name: "image_url", 
    type: "text", 
    nullable: true 
  })
  imageUrl?: string;

  @CreateDateColumn({
    name: "created_at", 
    type: "timestamptz" 
  })
  createdAt: Date;

  @Column({
    name: "scheduled_at", 
    type: "timestamptz", 
    nullable: true 
  })
  scheduledAt?: Date;

  @Column({
    name: "is_delivered", 
    type: "boolean", 
    default: false 
  })
  isDelivered: boolean;

  @Column({
    name: "delivered_at", 
    type: "timestamptz", 
    nullable: true 
  })
  deliveredAt?: Date;

  @Column({
    name: "is_read", 
    type: "boolean", 
    default: false 
  })
  isRead: boolean;

  @Column({
    name: "read_at", 
    type: "timestamptz", 
    nullable: true 
  })
  readAt?: Date;

  @Column({
    name: "priority", 
    type: "smallint", 
    default: 1 
  })
  priority: number;

  @Column({
    name: "data", 
    type: "jsonb", 
    nullable: true 
  })
  data?: SocialNotificationPayload;
}
