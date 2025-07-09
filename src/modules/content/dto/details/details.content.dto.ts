import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber } from "class-validator";

import { SwaggerType } from "@app/common/types";
import {
  ContentTypeEnum,
  ContentContainerTypeEnum,
  ContentStatusEnum
} from "../../types";

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
    description: "Owner manager id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ownerManagerId: number;

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
}
