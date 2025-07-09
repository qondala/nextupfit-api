import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";

export class DetailsBaseNutritionToolDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "ID of the nutrition tool",
    required: true
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Name of the nutrition tool",
    required: true
  })
  name: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description of the nutrition tool",
    required: false
  })
  description?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Image URL of the nutrition tool",
    required: false
  })
  imageUrl?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Creation date of the nutrition tool",
    required: false
  })
  createdAt?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Update date of the nutrition tool",
    required: false
  })
  updatedAt?: Date;
}
