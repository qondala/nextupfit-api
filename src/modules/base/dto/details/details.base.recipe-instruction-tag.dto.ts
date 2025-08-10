import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { BaseRecipeItemTypeEnum } from "../../types";
import { DetailsBaseUnitDto } from "./details.base.unit.dto";

export class DetailsBaseRecipeInstructionTagDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  id: number;

  @ApiProperty({
    enumName: "BaseRecipeItemTypeEnum",
    enum: BaseRecipeItemTypeEnum,
    required: true,
  })
  tagItemType: BaseRecipeItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  tagItemId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  order?: number;

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

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  recipeInstructionId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: false,
  })
  createdAt?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: false,
  })
  updatedAt?: Date;

  @ApiProperty({
    type: () => DetailsBaseUnitDto,
    required: false,
  })
  tagQuantityUnit?: DetailsBaseUnitDto;
}
