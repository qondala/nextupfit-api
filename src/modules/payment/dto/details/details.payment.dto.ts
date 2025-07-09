import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

import {
  PaymentPayableItemEnum,
  PaymentStatusEnum,
  PaymentMethodEnum,
} from "../../types";
import { BaseSubscriptionPlanItemEnum } from "@app/module/base/types";

export class DetailsPaymentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
  })
  paymentDate: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  @IsOptional()
  @IsString()
  secret?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    enum: PaymentPayableItemEnum,
    enumName: "PaymentPayableItemEnum",
  })
  @IsEnum(PaymentPayableItemEnum)
  itemType: PaymentPayableItemEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
  })
  @IsInt()
  itemId: number;

  @ApiProperty({
    enum: PaymentStatusEnum,
    enumName: "PaymentStatusEnum",
  })
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
  })
  updatedAt: Date;

  @ApiProperty({
    enum: PaymentMethodEnum,
    enumName: "PaymentMethodEnum",
  })
  @IsEnum(PaymentMethodEnum)
  paymentMethod: PaymentMethodEnum;

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
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  paymentCartId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  @IsOptional()
  @IsString()
  stripePaymentId?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  receiverUserId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  receiverManagerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  receiverGymId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
}
