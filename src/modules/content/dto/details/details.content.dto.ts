import { ApiProperty } from "@nestjs/swagger";
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested
} from "class-validator";

import { SwaggerType } from "@app/common/types";

import { SocialActorEnum } from "@app/module/social/types";

import {
  ContentTypeEnum,
  ContentContainerTypeEnum,
  ContentStatusEnum,
  ContentComposite,
  ContentPrivacyEnum
} from "../../types";
import { Type } from "class-transformer";

export class DetailsContentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    enum: ContentTypeEnum,
    enumName: "ContentTypeEnum",
    description: "Content type",
    example: ContentTypeEnum.text,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ContentTypeEnum)
  contentType: ContentTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Container id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  containerId: number;

  @ApiProperty({
    enum: ContentContainerTypeEnum,
    enumName: "ContentContainerTypeEnum",
    description: "Content container type",
    example: ContentContainerTypeEnum.gym,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ContentContainerTypeEnum)
  containerType: ContentContainerTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content position",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  contentPosition: number;

  @ApiProperty({
    enum: ContentStatusEnum,
    enumName: "ContentStatusEnum",
    description: "Content status",
    example: ContentStatusEnum.published,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ContentStatusEnum)
  status: ContentStatusEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Owner user id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ownerUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Owner manager id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerManagerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Owner gym id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerGymId?: number;

  @ApiProperty({
    enum: SocialActorEnum,
    enumName: "SocialActorEnum",
    description: "Owner type",
    example: SocialActorEnum.user,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(SocialActorEnum)
  ownerType: SocialActorEnum;

  @ApiProperty({
    enum: ContentPrivacyEnum,
    enumName: "ContentPrivacyEnum",
    description: "Content privacy",
    example: ContentPrivacyEnum.public,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(ContentPrivacyEnum)
  contentPrivacy: ContentPrivacyEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Content created date",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Content updated date",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  updatedAt: Date;


  @ApiProperty({
    type: () => ContentComposite,
    title: "ContentComposite",
    description: "Content",
    required: false,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => ContentComposite)
  content: ContentComposite;
}
