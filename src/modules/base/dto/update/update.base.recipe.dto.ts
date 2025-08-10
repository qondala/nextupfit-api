import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateBaseRecipeDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    maxLength: 255,
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: false,
  })
  duration?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  durationUnitId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
    maxLength: 255,
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  code?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    default: 1,
  })
  @IsOptional()
  @IsInt()
  nbPersons?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  ownerManagerId?: number;
}
