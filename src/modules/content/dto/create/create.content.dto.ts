import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsInt } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { ContentTypeEnum, ContentContainerTypeEnum } from "../../types";

export class CreateContentDto {
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
  @IsInt()
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
  @IsInt()
  contentPosition: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Owner manager id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ownerManagerId: number;
}
