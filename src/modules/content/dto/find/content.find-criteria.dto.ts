import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsInt,
} from "class-validator";

import { SwaggerType } from "@app/common/types";

import { SocialActorEnum } from "@app/module/social/types";

import {
  ContentTypeEnum,
  ContentContainerTypeEnum,
  ContentStatusEnum,
} from "../../types";

import { ContentFindOrderEnum } from ".";


export class ContentFindCriteriaDto {

  @ApiProperty({
    name: "contentType",
    enum: ContentTypeEnum,
    enumName: "ContentTypeEnum",
    description: "Search by content type",
    example: ContentTypeEnum.text,
    required: false,
  })
  @IsOptional()
  contentType?: ContentTypeEnum;

  @ApiProperty({
    name: "containerId",
    type: SwaggerType.INTEGER,
    description: "Search by container id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  containerId?: number;

  @ApiProperty({
    name: "containerType",
    enum: ContentContainerTypeEnum,
    enumName: "ContentContainerTypeEnum",
    description: "Search by content container type",
    example: ContentContainerTypeEnum.gym,
    required: false,
  })
  @IsOptional()
  containerType?: ContentContainerTypeEnum;


  @ApiProperty({
    name: "status",
    enum: ContentStatusEnum,
    enumName: "ContentStatusEnum",
    description: "Search by content status",
    example: ContentStatusEnum.published,
    required: false,
  })
  @IsOptional()
  status?: ContentStatusEnum;


  @ApiProperty({
    name: "ownerUserId",
    type: SwaggerType.INTEGER,
    description: "Search by owner user id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerUserId?: number;

  @ApiProperty({
    name: "ownerManagerId",
    type: SwaggerType.INTEGER,
    description: "Search by owner manager id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerManagerId?: number;

  @ApiProperty({
    name: "ownerGymId",
    type: SwaggerType.INTEGER,
    description: "Search by gym id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerGymId?: number;

  @ApiProperty({
    name: "ownerType",
    enum: SocialActorEnum,
    enumName: "SocialActorEnum",
    description: "Search by owner type",
    example: SocialActorEnum.user,
    required: false,
  })
  @IsOptional()
  ownerType?: SocialActorEnum;

  @ApiProperty({
    name: "orderBy",
    enum: ContentFindOrderEnum,
    enumName: "ContentFindOrderEnum",
    description: "Search by content order",
    required: false,
  })
  @IsOptional()
  orderBy?: ContentFindOrderEnum;
}
