import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { BaseRecipeInstructionTagEnum } from "../../types";

export class DetailsBaseRecipeInstructionTagDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true
  })
  id: number;

  @ApiProperty({
    enumName: "BaseRecipeInstructionTagEnum",
    enum: BaseRecipeInstructionTagEnum,
    required: true
  })
  tagType: BaseRecipeInstructionTagEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true
  })
  tagId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  order?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true
  })
  recipeInstructionId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    required: false
  })
  createdAt?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    required: false
  })
  updatedAt?: Date;
}
