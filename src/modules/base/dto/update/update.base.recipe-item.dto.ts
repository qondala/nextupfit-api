import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional
} from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseRecipeItemTypeEnum } from "../../types";

export class UpdateBaseRecipeItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    example: 1,
    description: "Recipe id"
  })
  @IsOptional()
  @IsInt()
  recipeId?: number;

  @ApiProperty({
    enum: BaseRecipeItemTypeEnum,
    enumName: "BaseRecipeItemTypeEnum", 
    example: BaseRecipeItemTypeEnum.food,
    description: "Item type"
  })
  @IsOptional()
  @IsEnum(BaseRecipeItemTypeEnum)
  itemType?: BaseRecipeItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    example: 3,
    description: "Item id (food or ingredient)"
  })
  @IsOptional()
  @IsInt()
  itemId?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: false,
    example: 2,
    description: "Item quantity"
  })
  @IsOptional()
  @IsNumber()
  itemQuantity?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    example: 5,
    description: "Quantity unit id"
  })
  @IsOptional()
  @IsInt()
  itemQuantityUnitId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    example: 0,
    description: "Order of item inside recipe"
  })
  @IsOptional()
  @IsInt()
  order?: number;
}
