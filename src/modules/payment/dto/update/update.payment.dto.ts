import {
  ApiProperty
} from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString
} from "class-validator";

import {
  SwaggerType
} from "@app/common/types";

import {
  PaymentPayableItemEnum,
  PaymentStatusEnum,
  PaymentMethodEnum,
} from "../../types";


export class UpdatePaymentDto {
  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Amount",
    required: false,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({
    enum: PaymentStatusEnum,
    enumName: "PaymentStatusEnum",
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentStatusEnum)
  status?: PaymentStatusEnum;

  @ApiProperty({
    enum: PaymentMethodEnum,
    enumName: "PaymentMethodEnum",
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentMethodEnum)
  paymentMethod?: PaymentMethodEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  @IsOptional()
  @IsString()
  secret?: string;

  @ApiProperty({
    enum: PaymentPayableItemEnum,
    enumName: "PaymentPayableItemEnum",
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentPayableItemEnum)
  itemType?: PaymentPayableItemEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  itemId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  currencyId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  paymentCartId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsOptional()
  @IsInt()
  paymentCreditCardId?: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: true,
  })
  @IsOptional()
  paymentDate: Date;

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
    type: SwaggerType.STRING,
    format: "date-time",
    required: true,
  })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: true,
  })
  @IsOptional()
  updatedAt: Date;
}
