import { IsNotEmpty, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

export class UpdateGymSpecializedInNutritionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    example: 235,
    required: false
  })
  @IsNotEmpty()
  @IsInt()
  gymId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrition id",
    example: 12,
    required: false
  })
  @IsNotEmpty()
  @IsInt()
  nutritionId?: number;
}

