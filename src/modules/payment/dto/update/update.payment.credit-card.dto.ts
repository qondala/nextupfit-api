import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsOptional,
    IsString,
} from 'class-validator';

import {
  PaymentCreditCardBrandEnum,
  PaymentCreditCardTypeEnum,
} from '../../types';

export class UpdatePaymentCreditCardDto{
  @ApiProperty({
    required: false,
    description: 'Card holder\'s full name',
  })
  @IsString()
  @IsOptional()
  holderName?: string;

  @ApiProperty({
    required: false,
    description: 'Card brand',
  })
  @IsEnum(PaymentCreditCardBrandEnum)
  @IsOptional()
  brand?: PaymentCreditCardBrandEnum;

  @ApiProperty({
    required: false,
    description: 'Card type',
  })
  @IsEnum(PaymentCreditCardTypeEnum)
  @IsOptional()
  type?: PaymentCreditCardTypeEnum;

  @ApiProperty({
    required: false,
    description: 'Last 4 digits of the card',
  })
  @IsOptional()
  last4?: string;

  @ApiProperty({
    required: false,
    description: 'Expiration month (MM)',
  })
  @IsOptional()
  expMonth?: string;

  @ApiProperty({
    required: false,
    description: 'Expiration year (YYYY)',
  })
  @IsOptional()
  expYear?: string;

  @ApiProperty({
    required: false,
    description: 'Billing address ID',
  })
  @IsOptional()
  billingAddressId?: string;
}
