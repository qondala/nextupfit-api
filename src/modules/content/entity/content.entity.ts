import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import { SocialActorEnum } from "@app/module/social/types";

import {
  ContentTypeEnum,
  ContentContainerTypeEnum,
  ContentStatusEnum,
  ContentPrivacyEnum
} from "../types";

import { ContentComposite } from "../types";

@Entity("content")
export class ContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "enum", enum: ContentTypeEnum, nullable: false})
  contentType: ContentTypeEnum;

  @Column({type: "bigint", nullable: false})
  containerId: number;


  @Column({type: "enum", enum: ContentContainerTypeEnum,  nullable: false})
  containerType: ContentContainerTypeEnum;

  @Column({type: "integer"})
  contentPosition: number;

  @Column({type: "enum", enum: ContentStatusEnum})
  status: ContentStatusEnum;


  @Column({type: "bigint", nullable: false})
  ownerUserId: number;

  @Column({type: "bigint", nullable: true})
  ownerManagerId: number;

  @Column({type: "bigint", nullable: true})
  ownerGymId: number;

  @Column({type: "enum", enum: SocialActorEnum, nullable: false})
  ownerType: SocialActorEnum;

  @Column({type: "enum", enum: ContentPrivacyEnum, nullable: false})
  contentPrivacy: ContentPrivacyEnum;

  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;

  content: ContentComposite;
}
