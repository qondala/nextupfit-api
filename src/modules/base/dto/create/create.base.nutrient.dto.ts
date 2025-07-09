import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseNutrientGroupEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class CreateBaseNutrientDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrient's name",
    example: "Carbohydrates",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description of the nutrient",
    example: "Carbohydrates are molecules made of carbon, hydrogen, and oxygen. Their main role is to provide your body with energy.",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
      description: "Brief insight",
    example: "This nutrient is used to measure sugar levels in the body.",
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  hint?: string;


  @ApiProperty({
    enum: BaseNutrientGroupEnum,
    enumName: "BaseNutrientGroupEnum",
    description: "Nutrient group",
    example: BaseNutrientGroupEnum.carbohydrates,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseNutrientGroupEnum)
  nutrientGroup: BaseNutrientGroupEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrient's name abbreviation",
    example: "Carbs",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  abbreviation: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient's unit id. Exple: 1=Carbohydrates",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  baseUnitId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient's display order",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  order?: number;
}
