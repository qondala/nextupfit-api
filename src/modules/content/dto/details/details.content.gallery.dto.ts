import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsEnum,
  ValidateNested,
} from "class-validator";

import { SwaggerType } from "@app/common/types";
import { ContentLayoutEnum } from "../../types";
import { Type } from "class-transformer";
import { DetailsContentGalleryItemDto } from "./items";

export class DetailsContentGalleryDto {
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
    type: SwaggerType.INTEGER,
    description: "Content id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Title",
    example: "Gallery title",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description",
    example: "Gallery description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Display title",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;

  @ApiProperty({
    enum: ContentLayoutEnum,
    enumName: "ContentLayoutEnum",
    description: "Layout",
    example: ContentLayoutEnum.grid,
    required: false,
  })
  @IsOptional()
  @IsEnum(ContentLayoutEnum)
  layout?: ContentLayoutEnum;

  @ApiProperty({
    type: SwaggerType.ARRAY,
    description: "Items",
    required: false,
  })
  @IsOptional()
  @Type(() => DetailsContentGalleryItemDto)
  @ValidateNested({ each: true })
  items: DetailsContentGalleryItemDto[];
}
