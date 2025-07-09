import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";

import { SwaggerType } from "@app/common/types";
import { BaseSubscriptionPlanItemEnum } from "@app/module/base/types";


export class CreateContentSusbcriptionPlanDto {
  @ApiProperty({
    enum: BaseSubscriptionPlanItemEnum,
    enumName: "BaseSubscriptionPlanItemEnum",
    description: "Item type (enum base_subscription_plan_item_enum)",
    required: true,
  })
  @IsEnum(BaseSubscriptionPlanItemEnum)
  itemType: BaseSubscriptionPlanItemEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    example: 123,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  itemId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Title",
    example: "My plan",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Description",
    example: "Plan description",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Display title",
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  displayTitle?: boolean;
}
