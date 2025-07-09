import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseNutrientGroupEnum } from "../../types";


export class UpdateBaseNutrientDto {

  @ApiProperty({
    description: "Nutrient's name",
    example: "Carbohydrates",
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;


  @ApiProperty({
    description: "Description of the nutrient",
    example: "Carbohydrates are molecules made of carbon, hydrogen, and oxygen. Their main role is to provide your body with energy.",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    description: "Brief insight",
    example: "This nutrient is used to measure sugar levels in the body.",
    required: false,
  })
  @IsOptional()
  @IsString()
  hint?: string;


  @ApiProperty({
    enum: BaseNutrientGroupEnum,
    enumName: "BaseNutrientGroupEnum",
    description: "Nutrient group",
    example: BaseNutrientGroupEnum.carbohydrates,
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseNutrientGroupEnum)
  nutrientGroup?: BaseNutrientGroupEnum;


  @ApiProperty({
    description: "Nutrient's name abbreviation",
    example: "Carbs",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  abbreviation?: string;


  @ApiProperty({
    description: "Nutrient's unit id. Exple: 1=Carbohydrates",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  baseUnitId?: number;


  @ApiProperty({
    description: "Nutrient's display order",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  order?: number;
}
