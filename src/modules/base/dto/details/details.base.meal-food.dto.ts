import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class DetailsBaseMealFoodDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Meal ID this food belongs to",
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  mealId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Food ID. Example: 58 = Drip Coffee (Regular Coffee)",
    example: 58,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  foodId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Quantity of the food required to constitute this meal",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  foodQty: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unit taken for the food quantity (e.g., 13 = ml)",
    example: 13,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  foodQtyUnitId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record creation timestamp",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Record last update timestamp",
    required: true,
  })
  updatedAt: Date;
}
