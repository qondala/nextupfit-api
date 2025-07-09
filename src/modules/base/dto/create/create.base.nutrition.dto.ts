import { IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

export class CreateBaseNutritionDto {

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
    example: "Chicken breast is rich in protein and low in fat.",
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
  @IsInt()
  baseNutritionTypeId: number;
}
