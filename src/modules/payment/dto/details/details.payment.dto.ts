import {
  ApiProperty
} from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

import {
  SwaggerType
} from "@app/common/types";

import {
  PaymentStatusEnum,
  PaymentMethodEnum,
  PaymentScopeEnum,
} from "../../types";
import {
  DetailsPaymentCartDto,
  DetailsPaymentCreditCardDto,
  DetailsPaymentItemDto,
} from ".";


export class DetailsPaymentDto {
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
    type: SwaggerType.STRING,
    format: "date-time",
    required: true,
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
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    enum: PaymentStatusEnum,
    enumName: "PaymentStatusEnum",
  })
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;

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
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  paymentCartId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  @IsOptional()
  @IsString()
  stripePaymentId?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({
    enum: PaymentScopeEnum,
    enumName: "PaymentScopeEnum",
    required: true,
  })
  @IsEnum(PaymentScopeEnum)
  paymentScope: PaymentScopeEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Payment credit card id",
    required: true,
  })
  @IsInt()
  paymentCreditCardId: number;


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
    type: () => DetailsPaymentCreditCardDto,
    description: "Payment credit card",
    required: true,
  })
  @Type(() => DetailsPaymentCreditCardDto)
  paymentCreditCard: DetailsPaymentCreditCardDto;

  @ApiProperty({
    type: () => DetailsPaymentCartDto,
    description: "Payment cart",
    required: true,
  })
  @Type(() => DetailsPaymentCartDto)
  paymentCart: DetailsPaymentCartDto;

  @ApiProperty({
    type: () => DetailsPaymentItemDto,
    isArray: true,
    description: "Payment items",
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsPaymentItemDto)
  items: DetailsPaymentItemDto[];
}
