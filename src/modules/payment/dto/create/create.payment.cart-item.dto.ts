import {
  ApiProperty
} from "@nestjs/swagger";
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsInt
} from "class-validator";

import {
  SwaggerType
} from "@app/common/types";
import {
  PaymentPayableItemEnum,
  PaymentStatusEnum
} from "../../types";


export class CreatePaymentCartItemDto {
  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Amount",
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: PaymentPayableItemEnum,
    enumName: "PaymentPayableItemEnum",
    required: true,
  })
  @IsEnum(PaymentPayableItemEnum)
  itemType: PaymentPayableItemEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Item id",
    required: true,
  })
  @IsInt()
  itemId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  currencyId?: number;

  @ApiProperty({
    enum: PaymentStatusEnum,
    enumName: "PaymentStatusEnum",
    required: false,
    description: "Payment cart status",
  })
  @IsOptional()
  @IsEnum(PaymentStatusEnum)
  status?: PaymentStatusEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
    description: "Payment cart id",
  })
  @IsOptional()
  @IsInt()
  paymentCartId?: number;
}
