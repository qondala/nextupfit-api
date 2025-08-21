import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";


import { SocialTagTargetEnum } from "../types";

@Entity({ name: "social_tag" })
export class SocialTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum",
    enum: SocialTagTargetEnum,
    enumName: "SocialTagTargetEnum",
  })
  target: SocialTagTargetEnum;

  @Column({ type: "bigint" })
  targetId: number;

  @Column({ nullable: false })
  tag: string;

  @Column({ type: "bigint" })
  authorUserId: number;

  @Column({ type: "bigint" })
  authorManagerId: number;

  @CreateDateColumn({ name: "createdAt" })
  createdAt: Date;
}
