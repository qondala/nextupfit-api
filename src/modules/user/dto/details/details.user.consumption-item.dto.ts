import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { BaseConsumptionItemTypeEnum } from "@app/module/base/types";

export class DetailsUserConsumptionItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record id",
    required: true,
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User consumption id",
    required: false,
  })
  userConsumptionId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Position",
    required: true,
  })
  position: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content consumption item id",
    required: false,
  })
  contentConsumptionItemId?: number;

  @ApiProperty({
    enum: BaseConsumptionItemTypeEnum,
    enumName: "BaseConsumptionItemTypeEnum",
    description: "Item type",
    required: true,
  })
  itemType: BaseConsumptionItemTypeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    required: true,
  })
  itemId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Created at",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Updated at",
    required: true,
  })
  updatedAt: Date;
}
