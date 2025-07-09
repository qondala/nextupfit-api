import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

import { SwaggerType } from "@app/common/types";

import {
  PaymentPayableItemEnum,
  PaymentMethodEnum,
} from "../../types";
import { BaseSubscriptionPlanItemEnum } from "@app/module/base/types";

export class CreatePaymentDto {
  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Amount to pay",
    example: 19.99,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Secret token",
    required: false,
  })
  @IsOptional()
  @IsString()
  secret?: string;

  @ApiProperty({
    enum: PaymentPayableItemEnum,
    enumName: "PaymentPayableItemEnum",
    description: "Item type",
  })
  @IsEnum(PaymentPayableItemEnum)
  itemType: PaymentPayableItemEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item identifier",
  })
  @IsInt()
  itemId: number;

  @ApiProperty({
    enum: PaymentMethodEnum,
    enumName: "PaymentMethodEnum",
    description: "Payment method",
  })
  @IsEnum(PaymentMethodEnum)
  paymentMethod: PaymentMethodEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Currency id",
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
    description: "Subscription plan id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  subscriptionPlanId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Payment cart id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  paymentCartId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Stripe payment id",
    required: false,
  })
  @IsOptional()
  @IsString()
  stripePaymentId?: string;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Receiver user id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  receiverUserId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Receiver manager id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  receiverManagerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Receiver gym id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  receiverGymId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Message",
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
}
