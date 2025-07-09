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

  @Column({type: "enum", enum: ContentTypeEnum})
  contentType: ContentTypeEnum;

  @Column({type: "integer"})
  containerId: number;


  @Column({type: "enum", enum: ContentContainerTypeEnum})
  containerType: ContentContainerTypeEnum;

  @Column({type: "integer"})
  contentPosition: number;

  @Column({type: "enum", enum: ContentStatusEnum})
  status: ContentStatusEnum;

  @CreateDateColumn()
  createdAt: Date;


  @UpdateDateColumn()
  updatedAt: Date;
}
