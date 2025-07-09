import { IsNotEmpty, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";


export class CreateBaseMealFoodDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Meal Id",
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  mealId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Food Id. Example, 58 = Drip Coffee (Regular Coffee)",
    example: 58,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  foodId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Quantity of food this food required to consitute this meal. Example, in order to have a Standard cup of coffee (meal), we need one cup ",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  foodQty: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unit taken for the food quantity. Exemple, 13 = ml (see Units database)",
    example: 13,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  foodQtyUnitId: number;
}
 