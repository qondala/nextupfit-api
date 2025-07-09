import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsInt } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateBaseMealFoodDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Meal Id",
    example: 3,
    required: false,
  })
  @IsOptional()
  @IsInt()
  mealId?: number;


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
    description: "Quantity of food this food required to consitute this meal. Example, in order to have a Standard cup of coffee (meal), we need one cup ",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  foodQty?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unit taken for the food quantity. Exemple, 13 = ml (see Units database)",
    example: 13,
    required: false,
  })
  @IsOptional()
  @IsInt()
  foodQtyUnitId?: number;
}
