import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

import {
  ContentTextColorEnum,
  ContentTextStyleEnum,
} from "@app/module/content/types";

export class UpdateContentOrderedlistItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "ordered list id",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  orderedlistId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Ordered list item title",
    description: "title",
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Ordered list item description",
    description: "description",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "https://example.com/image.jpg",
    description: "image url",
    required: false,
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: "Text styles",
    required: false,
    isArray: true,
    enum: ContentTextStyleEnum,
    example: Object.values(ContentTextStyleEnum),
  })
  @IsOptional()
  @IsArray()
  @IsEnum(ContentTextStyleEnum, { each: true })
  textStyles?: ContentTextStyleEnum[];

  @ApiProperty({
    description: "Text color",
    required: false,
    enum: ContentTextColorEnum,
    example: ContentTextColorEnum.red,
  })
  @IsOptional()
  @IsEnum(ContentTextColorEnum)
  textColor?: ContentTextColorEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 0,
    description: "position",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  position?: number;
}
