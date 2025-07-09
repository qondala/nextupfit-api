import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsInt } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateBaseNutritionDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Nutrition name",
    example: "Chicken Breast",
    required: false
  })
  @IsOptional()
  @IsString()
  name?: string;

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
    required: false
  })
  @IsOptional()
  @IsInt()
  baseNutritionTypeId?: number;
}
