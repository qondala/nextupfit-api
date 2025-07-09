import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsInt } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { PaymentPayableItemEnum, PaymentStatusEnum } from "../../types";
import { BaseSubscriptionPlanItemEnum } from "../../../base/types";

export class CreatePaymentCartDto {
  @ApiProperty({ type: SwaggerType.NUMBER, description: "Amount" })
  @IsNumber()
  amount: number;

  // userId will be supplied from authenticated context in controller

  @ApiProperty({
    enum: PaymentPayableItemEnum,
    enumName: "PaymentPayableItemEnum",
  })
  @IsEnum(PaymentPayableItemEnum)
  itemType: PaymentPayableItemEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
  })
  @IsInt()
  itemId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  currencyId?: number;

  @ApiProperty({
    enum: BaseSubscriptionPlanItemEnum,
    enumName: "BaseSubscriptionPlanItemEnum",
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseSubscriptionPlanItemEnum)
  subscriptionType?: BaseSubscriptionPlanItemEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  subscriptionPlanId?: number;

  @ApiProperty({
    enum: PaymentStatusEnum,
    enumName: "PaymentStatusEnum",
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentStatusEnum)
  status?: PaymentStatusEnum;
}
