import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class CreateGymManagerSpecializedInNutritionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager user id",
    example: 235,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  managerUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrition id",
    example: 12,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  baseNutritionId: number;
}
