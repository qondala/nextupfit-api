import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";

import { BaseConsumptionItemTypeEnum } from "@app/module/base/types";

export class CreateUserConsumptionItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User Consumption entity id",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  userConsumptionId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Order position of the item",
    example: 0,
    required: false,
    default: 0,
  })
  @IsOptional()
  @IsInt()
  position?: number = 0;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Related content consumption item id",
    example: 999,
    required: false,
  })
  @IsOptional()
  @IsInt()
  contentConsumptionItemId?: number;

  @ApiProperty({
    enum: BaseConsumptionItemTypeEnum,
    enumName: "BaseConsumptionItemTypeEnum",
    description: "Type of consumption item",
    example: BaseConsumptionItemTypeEnum.food,
    required: true,
  })
  @IsEnum(BaseConsumptionItemTypeEnum)
  @IsNotEmpty()
  itemType: BaseConsumptionItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id depending on type",
    example: 321,
    required: true,
  })
  @IsInt()
  @IsNotEmpty()
  itemId: number;
}
