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
import { Type } from "class-transformer";
import { SwaggerType } from "@app/common/types";

import { DetailsContentGoalsItemDto } from "./items";

export class DetailsContentGoalsDto {
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
    description: "content id",
  })
  @IsInt()
  @IsNotEmpty()
  contentId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Morning routine",
    description: "title",
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "Goals description",
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  displayTitle?: boolean;

  @ApiProperty({
    type: () => DetailsContentGoalsItemDto,
    isArray: true,
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentGoalsItemDto)
  items: DetailsContentGoalsItemDto[];
}
