import { ApiProperty } from "@nestjs/swagger";
import { SwaggerType } from "@app/common/types";

import {
  BaseSubscriptionPlanItemEnum,
  BaseSubscriptionPlanStatusEnum
} from "@app/module/base/types";


export class DetailsUserSubscriptionPlanDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  id: number;


  @ApiProperty({
    enum: BaseSubscriptionPlanItemEnum,
    enumName: "BaseSubscriptionPlanItemEnum",
    title: "BaseSubscriptionPlanItemEnum",
    description: "Subscription plan item type",
    required: true,
  })
  itemType: BaseSubscriptionPlanItemEnum;

  
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Subscription plan item id",
    required: true,
  })
  itemId: number;

  
  @ApiProperty({
    enum: BaseSubscriptionPlanStatusEnum,
    enumName: "BaseSubscriptionPlanStatusEnum",
    title: "BaseSubscriptionPlanStatusEnum",
    description: "Subscription plan status",
    required: true,
  })
  status: BaseSubscriptionPlanStatusEnum;

  
  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Subscription plan created at",
    required: true,
  })
  createdAt: Date;

  
  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Subscription plan updated at",
    required: true,
  })
  updatedAt: Date;
}
