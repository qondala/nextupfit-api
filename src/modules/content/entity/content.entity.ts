import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

import {
  ContentTypeEnum,
  ContentContainerTypeEnum,
  ContentStatusEnum
} from "../types";


@Entity("content")
export class ContentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "enum", enum: ContentTypeEnum, nullable: false})
  contentType: ContentTypeEnum;

  @Column({type: "integer", nullable: false})
  containerId: number;


  @Column({type: "enum", enum: ContentContainerTypeEnum,  nullable: false})
  containerType: ContentContainerTypeEnum;

  @Column({type: "integer"})
  contentPosition: number;

  @Column({type: "enum", enum: ContentStatusEnum})
  status: ContentStatusEnum;

  @Column({type: "integer", nullable: false})
  ownerManagerId: number;

  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
