import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { PaymentPayableItemEnum, PaymentStatusEnum } from "../../types";
import { BaseSubscriptionPlanItemEnum } from "../../../base/types";

export class DetailsPaymentCartDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    enum: PaymentPayableItemEnum,
    required: true,
  })
  @IsEnum(PaymentPayableItemEnum)
  itemType: PaymentPayableItemEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
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
    required: true,
  })
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: true,
  })
  updatedAt: Date;
}
