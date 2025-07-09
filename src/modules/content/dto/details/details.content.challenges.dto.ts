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

import { DetailsContentChallengesItemDto } from "./items";

export class DetailsContentChallengesDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "content id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "title",
    example: "title",
    required: false,
  })
  @IsOptional()
  @IsString()
  title: string;

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
  @IsBoolean()
  displayTitle: boolean;

  @ApiProperty({
    type: () => DetailsContentChallengesItemDto,
    title: "DetailsContentChallengesItemDto",
    isArray: true,
    description: "Challenges items",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentChallengesItemDto)
  items: DetailsContentChallengesItemDto[];
}