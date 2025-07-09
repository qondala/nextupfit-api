import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ContentTypeEnum, ContentContainerTypeEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class UpdateContentDto {
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
}
