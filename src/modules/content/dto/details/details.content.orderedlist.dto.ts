import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { SwaggerType } from "@app/common/types";
import { DetailsContentOrderedlistItemDto } from "./items";
import { Type } from "class-transformer";

export class DetailsContentOrderedlistDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "record id",
  })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 123,
    description: "Content id",
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  contentId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Ordered list title",
    description: "title",
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Ordered list description",
    description: "description",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    example: true,
    description: "display title",
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  displayTitle?: boolean;

  @ApiProperty({
    type: () => DetailsContentOrderedlistItemDto,
    title: "DetailsContentOrderedlistItemDto",
    isArray: true,
    description: "Ordered list items",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentOrderedlistItemDto)
  items: DetailsContentOrderedlistItemDto[];
}
