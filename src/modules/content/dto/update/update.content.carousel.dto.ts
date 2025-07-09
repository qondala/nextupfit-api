import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { DetailsContentCarouselItemDto } from "../details/items";
import { SwaggerType } from "@app/common/types";

export class UpdateContentCarouselDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  contentId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "title",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "description",
    example: "description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "display title",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;

  
  @ApiProperty({
    type: () => DetailsContentCarouselItemDto,
    title: "DetailsContentCarouselItemDto",
    isArray: true,
    description: "Carousel items",
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentCarouselItemDto)
  items?: DetailsContentCarouselItemDto[];
}
