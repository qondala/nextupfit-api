import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { SwaggerType } from "@app/common/types";

import {
  ContentTextColorEnum,
  ContentTextStyleEnum,
} from "@app/module/content/types";

export class DetailsContentTipsItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "record id",
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "tips id",
  })
  @IsNumber()
  @IsNotEmpty()
  tipsId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Tips item title",
    description: "title",
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Tips item description",
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
    type: SwaggerType.STRING,
    example: "https://example.com/video.mp4",
    description: "video url",
    required: false,
  })
  @IsString()
  @IsOptional()
  videoUrl?: string;

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
}
