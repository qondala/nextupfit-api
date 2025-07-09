import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { DetailsGymDto } from "./";
import { DetailsBaseNutritionDto } from "@app/module/base/dto";
import { SwaggerType } from "@app/common/types";

export class DetailsGymSpecializedInNutritionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    required: true
  })
  gymId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrition id",
    required: true
  })
  nutritionId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Created at",
    example: "2025-05-02T00:00:00.000Z",
    required: false
  })
  createdAt?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Updated at",
    example: "2025-05-02T00:00:00.000Z",
    required: false
  })
  updatedAt?: Date;

  @ApiProperty({
    type: () => DetailsBaseNutritionDto,
    title: "DetailsBaseNutritionDto",
    description: "Base nutrition details",
    required: true
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsBaseNutritionDto)
  nutrition: DetailsBaseNutritionDto;

  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: "Gym details",
    required: false
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => DetailsGymDto)
  gym?: DetailsGymDto;
}
