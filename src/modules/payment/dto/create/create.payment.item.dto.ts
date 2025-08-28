import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SwaggerType } from '@app/common/types';
import { PaymentStatusEnum } from '../../types';

export class CreatePaymentItemDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
    description: 'ID of the cart item being paid for'
  })
  @IsNumber()
  cartItemId: number;

  @ApiProperty({
    enum: PaymentStatusEnum,
    enumName: "PaymentStatusEnum",
    default: PaymentStatusEnum.done,
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentStatusEnum)
  status?: PaymentStatusEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
    description: 'ID of the payment this item belongs to'
  })
  @IsNumber()
  paymentId: number;
}
