import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { ContentTypeEnum, ContentContainerTypeEnum } from "../../types";


export class UpdateContentDto {
  @ApiProperty({
    enum: ContentTypeEnum,
    enumName: "ContentTypeEnum",
    description: "Content type",
    example: ContentTypeEnum.text,
    required: false,
  })
  @IsOptional()
  @IsEnum(ContentTypeEnum)
  contentType?: ContentTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Container id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  containerId?: number;

  @ApiProperty({
    enum: ContentContainerTypeEnum,
    enumName: "ContentContainerTypeEnum",
    description: "Content container type",
    example: ContentContainerTypeEnum.gym,
    required: false,
  })
  @IsOptional()
  @IsEnum(ContentContainerTypeEnum)
  containerType?: ContentContainerTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content position",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  contentPosition?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Owner manager id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ownerManagerId?: number;
}
