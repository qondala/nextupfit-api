import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { DetailsBaseFoodDto, DetailsBaseNutrientDto } from ".";
import { Type } from "class-transformer";


export class DetailsBaseFoodNutrientDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "Record ID"
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 58,
    description: "Food ID"
  })
  @IsInt()
  foodId: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    example: 100,
    description: "Food quantity"
  })
  @IsInt()
  foodQty: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 14,
    description: "Unit ID for food quantity"
  })
  @IsInt()
  foodQtyUnitId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "Nutrient ID"
  })
  @IsInt()
  nutrientId: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    example: 5,
    description: "Nutrient quantity"
  })
  @IsInt()
  nutrientQty: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 14,
    description: "Unit ID for nutrient quantity"
  })
  @IsInt()
  nutrientQtyUnitId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1368464,
    description: "Creator User ID"
  })
  @IsInt()
  createdByUserId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    example: "coffee-carb-100g",
    description: "Unique code/slug",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    example: "2022-01-01T00:00:00Z",
    description: "Created timestamp"
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    example: "2022-01-02T00:00:00Z",
    description: "Last update timestamp"
  })
  updatedAt: Date;


  @ApiProperty({
    type: () => DetailsBaseFoodDto,
    title: "DetailsBaseFoodDto",
    description: "Food details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsBaseFoodDto)
  food: DetailsBaseFoodDto;


  @ApiProperty({
    type: () => DetailsBaseNutrientDto,
    title: "DetailsBaseNutrientDto",
    description: "Nutrient details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsBaseNutrientDto)
  nutrient: DetailsBaseNutrientDto;
}
