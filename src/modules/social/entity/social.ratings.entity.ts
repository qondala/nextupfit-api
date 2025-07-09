import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { SocialReviewItemTypeEnum } from "../types";

@Entity({ name: "social_ratings" })
export class SocialRatingsEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ name: "itemType", type: "enum", enum: SocialReviewItemTypeEnum })
  itemType: SocialReviewItemTypeEnum;

  @Column({ name: "itemId", type: "bigint" })
  itemId: number;

  @Column({ name: "averageRating", type: "numeric", nullable: true })
  averageRating: number;

  @Column({ name: "averageEaseOfUse", type: "numeric", nullable: true })
  averageEaseOfUse: number;

  @Column({ name: "averageEffectiveness", type: "numeric", nullable: true })
  averageEffectiveness: number;

  @Column({ name: "totalReviews", type: "integer", nullable: true })
  totalReviews: number;

  @Column({ name: "minRating", type: "integer", nullable: true })
  minRating: number;

  @Column({ name: "maxRating", type: "integer", nullable: true })
  maxRating: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updatedAt", nullable: true })
  updatedAt?: Date;
}
