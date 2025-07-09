import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional } from "class-validator";
import { BaseConsumptionItemTypeEnum } from "@app/module/base/types";

import { SwaggerType } from "@app/common/types";

export class UpdateContentConsumptionItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "consumption id",
    example: 1234,
    required: false
  })
  @IsOptional()
  @IsInt()
  consumptionId?: number;

  @ApiProperty({
    enum: BaseConsumptionItemTypeEnum,
    enumName: "BaseConsumptionItemTypeEnum",
    description: "item type",
    example: BaseConsumptionItemTypeEnum.food,
    required: false
  })
  @IsOptional()
  @IsEnum(BaseConsumptionItemTypeEnum)
  itemType?: BaseConsumptionItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "item id",
    example: 1234,
    required: false
  })
  @IsOptional()
  @IsInt()
  itemId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "quantity",
    example: 2,
    required: false
  })
  @IsOptional()
  @IsInt()
  quantity?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "quantity unit id",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsInt()
  quantityUnitId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1,
    required: false
  })
  @IsOptional()
  @IsInt()
  position?: number;
}
