import { ApiProperty } from '@nestjs/swagger';
import { SwaggerType } from '@app/common/types';
import { DetailsPaymentCartItemDto } from './details.payment.cart-item.dto';
import { Type } from 'class-transformer';
import { DetailsPaymentDto } from '.';
import { PaymentStatusEnum } from '../../types';
import { IsEnum } from 'class-validator';

export class DetailsPaymentItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
    description: 'Payment item ID'
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
    description: 'ID of the cart item being paid for'
  })
  cartItemId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
    description: 'ID of the payment this item belongs to'
  })
  paymentId: number;

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
    type: () => DetailsPaymentCartItemDto,
    description: "Content linked to the advertisement",
    required: true,
  })
  @Type(() => DetailsPaymentCartItemDto)
  cartItem: DetailsPaymentCartItemDto;

  @ApiProperty({
    type: () => DetailsPaymentDto,
    description: "Content linked to the advertisement",
    required: true,
  })
  @Type(() => DetailsPaymentDto)
  payment: DetailsPaymentDto;
}
