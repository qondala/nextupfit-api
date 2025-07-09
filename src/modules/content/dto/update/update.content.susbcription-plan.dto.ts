import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseSubscriptionPlanItemEnum } from "@app/module/base/types";

export class UpdateContentSusbcriptionPlanDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Record id",
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    enum: BaseSubscriptionPlanItemEnum,
    enumName: "BaseSubscriptionPlanItemEnum",
    description: "Item type",
    required: true,
  })
  @IsEnum(BaseSubscriptionPlanItemEnum)
  itemType: BaseSubscriptionPlanItemEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    required: true,
  })
  @IsNumber()
  itemId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Title",
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Display title",
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;
}
