import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsInt, IsNumber } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseConsumptionItemTypeEnum } from "@app/module/base/types";

export class DetailsContentConsumptionItemDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "consumption id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  consumptionId: number;


  @ApiProperty({
    enum: BaseConsumptionItemTypeEnum,
    enumName: "BaseConsumptionItemTypeEnum",
    description: "Content type",
    example: BaseConsumptionItemTypeEnum.food,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(BaseConsumptionItemTypeEnum)
  itemType: BaseConsumptionItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "item id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  itemId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "quantity",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  quantity: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "quantity unit id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  quantityUnitId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "position",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  position: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "created at",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "updated at",
    example: "2025-05-02T00:00:00.000Z",
    required: false,
  })
  updatedAt: Date;
}