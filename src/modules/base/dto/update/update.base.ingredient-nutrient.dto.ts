import { IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

export class UpdateBaseIngredientNutrientDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Ingredient ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ingredientId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Ingredient quantity",
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ingredientQty?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Ingredient quantity unit ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  ingredientQtyUnitId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  nutrientId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient quantity",
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsInt()
  nutrientQty?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient quantity unit ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  nutrientQtyUnitId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description:
      "User ID (Gym manager) who created the ingredient nutrient record.",
    example: 1368464,
    required: false,
  })
  @IsOptional()
  @IsInt()
  createdByUserId?: number;
}
