import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { BaseRecipeItemTypeEnum } from "../../types";

export class UpdateBaseRecipeInstructionTagDto {
  @ApiProperty({
    enumName: "BaseRecipeItemTypeEnum",
    enum: BaseRecipeItemTypeEnum,
    required: false,
  })
  tagItemType?: BaseRecipeItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  tagItemId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  order?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  recipeInstructionId?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: false,
  })
  tagQuantity?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  tagQuantityUnitId?: number;
}

