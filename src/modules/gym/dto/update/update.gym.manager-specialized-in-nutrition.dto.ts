import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";

export class UpdateGymManagerSpecializedInNutritionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager user id",
    example: 235,
    required: false
  })
  @IsOptional()
  @IsInt()
  managerUserId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrition id",
    example: 12,
    required: false
  })
  @IsOptional()
  @IsInt()
  baseNutritionId?: number;
}
