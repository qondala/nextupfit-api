import { ApiProperty } from "@nestjs/swagger";
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";

import { SwaggerType } from "@app/common/types";

import { DetailsBaseNutritionTypeDto } from ".";

export class DetailsBaseNutritionDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition name",
    example: "Chicken Breast",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition description",
    example: "Rich in protein",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Unique code identifier",
    example: "CHK-BRST",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrition type id",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  baseNutritionTypeId: number;


  @ApiProperty({
    type: () => DetailsBaseNutritionTypeDto,
    description: "Nutrition type",
    example: {
      id: 1,
      name: "Protein",
      description: "Macronutrient essential for muscle growth and repair",
      code: "PRO",
      createdAt: "2025-01-01T00:00:00.000Z",
      updatedAt: "2025-01-01T00:00:00.000Z"
    },
    required: true
  })
  nutritionType: DetailsBaseNutritionTypeDto;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record created date",
    example: "2025-01-01T00:00:00.000Z",
    required: false
  })
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record updated date",
    example: "2025-01-01T00:00:00.000Z",
    required: false
  })
  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
