import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { SwaggerType } from '@app/common/types';

import {
  PaymentCreditCardBrandEnum,
  PaymentCreditCardTypeEnum,
} from '../../types';


export class CreatePaymentCreditCardDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Card holder\'s full name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  holderName: string;

  @ApiProperty({
    enum: PaymentCreditCardBrandEnum,
    enumName: "PaymentCreditCardBrandEnum",
    description: 'Card brand',
    required: true,
  })
  @IsEnum(PaymentCreditCardBrandEnum)
  brand: PaymentCreditCardBrandEnum;

  @ApiProperty({
    enum: PaymentCreditCardTypeEnum,
    enumName: "PaymentCreditCardTypeEnum",
    description: 'Card type',
    required: true,
  })
  @IsEnum(PaymentCreditCardTypeEnum)
  type: PaymentCreditCardTypeEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Last 4 digits of the card',
    required: true,
  })
  @IsString()
  @Length(4, 4)
  @IsNumberString()
  last4: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Expiration month (MM)',
    required: true,
  })
  @IsString()
  @Length(2, 2)
  @IsNumberString()
  expMonth: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Expiration year (YYYY)',
    required: true,
  })
  @IsString()
  @Length(4, 4)
  @IsNumberString()
  expYear: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
    description: 'Payment token from payment processor',
  })
  @IsString()
  @IsOptional()
  paymentToken?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
    description: 'Billing address ID',
  })
  @IsString()
  @IsOptional()
  billingAddressId?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
    description: 'Card fingerprint',
  })
  @IsString()
  @IsOptional()
  fingerprint?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Network token for the card',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  networkToken: string;
}
