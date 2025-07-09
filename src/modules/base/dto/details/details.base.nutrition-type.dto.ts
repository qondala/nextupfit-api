import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { IsNumber } from "class-validator";
import { DetailsBaseNutritionDto } from ".";
export class DetailsBaseNutritionTypeDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym follower',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition type name",
    example: "Protein",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  name: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description of the nutrition type",
    example: "Macronutrient essential for muscle growth and repair",
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Unique code identifier",
    example: "PROT",
    required: false
  })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({
    type: () => DetailsBaseNutritionDto,
    isArray: true,
    title: "DetailsBaseNutritionDto[]",
    description: 'Nutritions of the nutrition type',
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseNutritionDto)
  nutritions: DetailsBaseNutritionDto[];
}
