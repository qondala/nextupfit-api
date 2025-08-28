import {
  ApiProperty,
} from '@nestjs/swagger';

import {
  SwaggerType,
} from '@app/common/types';
import {
  PaymentCreditCardBrandEnum,
  PaymentCreditCardTypeEnum,
} from '../../types';

export class DetailsPaymentCreditCardDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
    description: 'Credit card ID',
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
    description: 'User ID who owns this card',
  })
  userId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: true,
    description: 'Card holder\'s full name',
  })
  holderName: string;

  @ApiProperty({
    enum: PaymentCreditCardBrandEnum,
    enumName: 'PaymentCreditCardBrandEnum',
    required: true,
    description: 'Card brand',
  })
  brand: PaymentCreditCardBrandEnum;

  @ApiProperty({
    enum: PaymentCreditCardTypeEnum,
    enumName: 'PaymentCreditCardTypeEnum',
    required: true,
    description: 'Card type',
  })
  type: PaymentCreditCardTypeEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: true,
    description: 'Last 4 digits of the card',
  })
  last4: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: true,
    description: 'Expiration month (MM)',
  })
  expMonth: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: true,
    description: 'Expiration year (YYYY)',
  })
  expYear: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
    description: 'Billing address ID',
  })
  billingAddressId?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: true,
    description: 'Network token for the card',
  })
  networkToken: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    required: true,
    description: 'Date when the card was created',
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    required: true,
    description: 'Date when the card was last updated',
  })
  updatedAt: Date;
}
