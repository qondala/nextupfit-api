import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { BaseRecipeItemTypeEnum } from "../../types";

export class DetailsBaseRecipeItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true
  })
  recipeId: number;

  @ApiProperty({
    enumName: "BaseRecipeItemTypeEnum",
    enum: BaseRecipeItemTypeEnum,
    required: true
  })
  itemType: BaseRecipeItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  itemId?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: false
  })
  itemQuantity?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  itemQuantityUnitId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false
  })
  order?: number;

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
