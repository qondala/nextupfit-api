import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseNutrientGroupEnum } from "../../types";

export class DetailsBaseNutrientDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record ID",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrient name",
    example: "Carbohydrates",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description of the nutrient",
    example: "Carbohydrates provide energy.",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Brief hint about the nutrient",
    example: "Measured to track sugar levels.",
    required: false
  })
  @IsOptional()
  @IsString()
  hint?: string;

  @ApiProperty({
    enum: BaseNutrientGroupEnum,
    enumName: "BaseNutrientGroupEnum",
    description: "Nutrient group",
    example: BaseNutrientGroupEnum.carbohydrates,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(BaseNutrientGroupEnum)
  nutrientGroup: BaseNutrientGroupEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrient abbreviation",
    example: "Carbs",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  abbreviation: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Base unit ID",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  baseUnitId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Display order",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Unique code/slug",
    example: "carbs",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record creation timestamp",
    required: true
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record last update timestamp",
    required: true
  })
  updatedAt: Date;
}
