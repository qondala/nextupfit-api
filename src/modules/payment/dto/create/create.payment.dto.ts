import {
  ApiProperty
} from "@nestjs/swagger";
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
  PaymentMethodEnum,
  PaymentScopeEnum,
} from "../../types";


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
    type: SwaggerType.INTEGER,
    description: "Payment cart id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  paymentCartId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Payment credit card id",
    required: true,
  })
  @IsInt()
  paymentCreditCardId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Stripe payment id",
    required: false,
  })
  @IsOptional()
  @IsString()
  stripePaymentId?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Message",
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({
    enum: PaymentScopeEnum,
    enumName: "PaymentScopeEnum",
    description: "Payment scope",
    required: true,
  })
  @IsEnum(PaymentScopeEnum)
  paymentScope: PaymentScopeEnum;
}
