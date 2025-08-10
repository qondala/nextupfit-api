import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseRecipeItemTypeEnum } from "../../types";

export class CreateBaseRecipeInstructionTagDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    enum: BaseRecipeItemTypeEnum,
    enumName: "BaseRecipeItemTypeEnum",
    example: BaseRecipeItemTypeEnum.tool,
    description: "Tag item type",
  })
  @IsNotEmpty()
  @IsEnum(BaseRecipeItemTypeEnum)
  tagItemType: BaseRecipeItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Referenced item id",
  })
  @IsNotEmpty()
  @IsInt()
  tagItemId: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Referenced item quantity",
  })
  @IsNotEmpty()
  @IsInt()
  tagQuantity?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Referenced item quantity unit id",
  })
  @IsNotEmpty()
  @IsInt()
  tagQuantityUnitId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    description: "Order index",
  })
  @IsOptional()
  @IsInt()
  order?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Recipe instruction id",
  })
  @IsNotEmpty()
  @IsInt()
  recipeInstructionId: number;
}
