import { IsNotEmpty, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

export class CreateGymSpecializedInNutritionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    example: 235,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  gymId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrition id",
    example: 12,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  nutritionId: number;
}
