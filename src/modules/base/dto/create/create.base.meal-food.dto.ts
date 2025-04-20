import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateBaseMealFoodDto {

  @ApiProperty({
    description: "Meal Id",
    example: 3,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  mealId: number;


  @ApiProperty({
    description: "Food Id. Example, 58 = Drip Coffee (Regular Coffee)",
    example: 58,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  foodId: number;


  @ApiProperty({
    description: "Quantity of food this food required to consitute this meal. Example, in order to have a Standard cup of coffee (meal), we need one cup ",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  foodQty: number;


  @ApiProperty({
    description: "Unit taken for the food quantity. Exemple, 13 = ml (see Units database)",
    example: 13,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  foodQtyUnitId: number;
}
 