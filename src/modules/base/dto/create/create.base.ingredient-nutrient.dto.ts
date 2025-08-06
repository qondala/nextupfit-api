import { IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

export class CreateBaseIngredientNutrientDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Ingredient ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ingredientId: number;

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
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  ingredientQtyUnitId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  nutrientId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient quantity",
    example: 50,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  nutrientQty: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient quantity unit ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  nutrientQtyUnitId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description:
      "User ID (Gym manager) who created the ingredient nutrient record.",
    example: 1368464,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  createdByUserId: number;
}
