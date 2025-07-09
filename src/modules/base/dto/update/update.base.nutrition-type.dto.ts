import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateBaseNutritionTypeDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition type name",
    example: "Protein",
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;


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
}
