import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsInt } from "class-validator";
import { BaseConsumptionItemTypeEnum } from "@app/module/base/types";

import { SwaggerType } from "@app/common/types";

export class CreateContentConsumptionItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "consumption id",
    example: 1234,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  consumptionId: number;

  @ApiProperty({
    enum: BaseConsumptionItemTypeEnum,
    enumName: "BaseConsumptionItemTypeEnum",
    description: "item type",
    example: BaseConsumptionItemTypeEnum.food,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(BaseConsumptionItemTypeEnum)
  itemType: BaseConsumptionItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "item id",
    example: 1234,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  itemId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "quantity",
    example: 2,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  quantity: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "quantity unit id",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  quantityUnitId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  position: number;
}
