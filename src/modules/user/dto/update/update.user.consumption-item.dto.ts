import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";
import { BaseConsumptionItemTypeEnum } from "@app/module/base/types";
import { IsEnum, IsInt, IsOptional } from "class-validator";

export class UpdateUserConsumptionItemDto {
  @ApiProperty({ type: SwaggerType.INTEGER, description: "User consumption id", required: false })
  @IsOptional()
  @IsInt()
  userConsumptionId?: number;

  @ApiProperty({ type: SwaggerType.INTEGER, description: "Position order", required: false })
  @IsOptional()
  @IsInt()
  position?: number;

  @ApiProperty({ type: SwaggerType.INTEGER, description: "Content consumption item id", required: false })
  @IsOptional()
  @IsInt()
  contentConsumptionItemId?: number;

  @ApiProperty({ enum: BaseConsumptionItemTypeEnum, enumName: "BaseConsumptionItemTypeEnum", required: false })
  @IsOptional()
  @IsEnum(BaseConsumptionItemTypeEnum)
  itemType?: BaseConsumptionItemTypeEnum;

  @ApiProperty({ type: SwaggerType.INTEGER, description: "Item id", required: false })
  @IsOptional()
  @IsInt()
  itemId?: number;
}
