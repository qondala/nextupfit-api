import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseNutrientGroupEnum } from "../../types";


export class CreateBaseNutrientDto {

  @ApiProperty({
    description: "Nutrient's name",
    example: "Carbohydrates",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


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
  @IsNotEmpty()
  @IsString()
  hint?: string;


  @ApiProperty({
    description: "Nutrient group",
    example: BaseNutrientGroupEnum.carbohydrates,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseNutrientGroupEnum)
  nutrientGroup: BaseNutrientGroupEnum;


  @ApiProperty({
    description: "Nutrient's name abbreviation",
    example: "Carbs",
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  abbreviation: string;


  @ApiProperty({
    description: "Nutrient's unit id. Exple: 1=Carbohydrates",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  baseUnitId: number;


  @ApiProperty({
    description: "Nutrient's display order",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  order?: number;
}
