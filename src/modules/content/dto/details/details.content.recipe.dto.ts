import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

export class DetailsContentRecipeDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    example: 1,
    description: "record id",
    required: true
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true
  })
  contentId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true
  })
  recipeId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  title?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false
  })
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    required: false
  })
  displayTitle: boolean;
}
