import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateBaseFoodNutrientsDto {

  @ApiProperty({
    description: "Food Id. Example, 58 = Drip Coffee (Regular Coffee)",
    example: 58,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  foodId: number;


  @ApiProperty({
    description: "Quantity of food to be measured with the presence of the nutrient. Example: 5mg",
    example: 5,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  foodQty: number;


  @ApiProperty({
    description: "Unit taken for the food quantity. Exemple, 14 = mg (see Units database)",
    example: 13,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  foodQtyUnitId: number;


  @ApiProperty({
    description: "Nutrient's id we want to know the presence amount in the food. Example: 1 = Carbohydrate.",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  nutrientId: number;


  @ApiProperty({
    description: "Nutrient's quantity in the food. Example: 5 mg.",
    example: 5,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  nutrientQty: number;


  @ApiProperty({
    description: "Nutrient's quantity unit. Example: mg.",
    example: 5,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  nutrientQtyUnitId: number;


  @ApiProperty({
    description: "UserId (Gym manager) who created the  record.",
    example: 1368464,
    required: true,
  })
  @IsNotEmpty()
  @IsNotEmpty()
  createdByUserId: number;

}
