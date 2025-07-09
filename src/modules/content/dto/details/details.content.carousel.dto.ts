import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { SwaggerType } from "@app/common/types";

import { DetailsContentCarouselItemDto } from "./items";

export class DetailsContentCarouselDto {
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
    description: "content id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "title",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "description",
    example: "description",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "display title",
    example: true,
    required: true,
  })
  @IsBoolean()
  displayTitle: boolean;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "media type",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  mediaType: number;

  
  @ApiProperty({
    type: () => DetailsContentCarouselItemDto,
    title: "DetailsContentCarouselItemDto",
    isArray: true,
    description: "Carousel items",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentCarouselItemDto)
  items: DetailsContentCarouselItemDto[];
}