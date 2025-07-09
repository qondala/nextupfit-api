import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { DetailsBaseNutritionDto } from "@app/module/base/dto";


export class DetailsGymManagerSpecializedInNutritionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record id",
    example: 1
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Manager id",
    example: 55
  })
  @IsNotEmpty()
  @IsNumber()
  managerId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Nutrition id",
    example: 12
  })
  @IsNotEmpty()
  @IsNumber()
  baseNutritionId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Creation timestamp"
  })
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Update timestamp"
  })
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty({
    type: () => DetailsBaseNutritionDto,
    title: "DetailsBaseNutritionDto",
    description: "Base nutrition info"
  })
  @Type(() => DetailsBaseNutritionDto)
  baseNutrition: DetailsBaseNutritionDto;
}
