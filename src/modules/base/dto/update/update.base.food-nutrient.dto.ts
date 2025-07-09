import { IsOptional, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";


export class UpdateBaseFoodNutrientDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Food Id. Example, 58 = Drip Coffee (Regular Coffee)",
    example: 58,
    required: false,
  })
  @IsOptional()
  @IsInt()
  foodId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Quantity of food to be measured with the presence of the nutrient. Example: 5mg",
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  foodQty?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unit taken for the food quantity. Exemple, 14 = mg (see Units database)",
    example: 13,
    required: false,
  })
  @IsOptional()
  @IsInt()
  foodQtyUnitId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient's id we want to know the presence amount in the food. Example: 1 = Carbohydrate.",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsInt()
  nutrientId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient's quantity in the food. Example: 5 mg.",
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  nutrientQty?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrient's quantity unit. Example: mg.",
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  nutrientQtyUnitId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "UserId (Gym manager) who created the  record.",
    example: 1368464,
    required: false,
  })
  @IsOptional()
  @IsOptional()
  createdByUserId?: number;
}
