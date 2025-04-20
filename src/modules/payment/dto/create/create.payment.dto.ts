import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PaymentPayableItemEnum, PaymentStatusEnum } from "../../types";


export class CreatePaymentDto {
  @ApiProperty({
    description: "Amount paid",
    example: 500,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  amountPaid: number;


  @ApiProperty({
    description: "Payment currency",
    example: "usd",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  currency: string;

  
  @ApiProperty({
    description: "Payment date",
    example: Date(),
    required: false
  })
  @IsNotEmpty()
  @IsDate()
  paymentDate?: Date;


  @ApiProperty({
    description: "Payment method",
    example: "card",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;


  @ApiProperty({
    description: "Payment secret",
    example: "eer453#ferr@erre$eger-gef_e!er",
    required: true
  })
  @IsString()
  @IsNotEmpty()
  secret: string;


  @ApiProperty({
    description: "User id",
    example: 12434,
    required: true
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;


  @ApiProperty({
    description: "Item type to be paid",
    example: PaymentPayableItemEnum.workingsession,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(PaymentPayableItemEnum)
  item: PaymentPayableItemEnum


  @ApiProperty({
    description: "Item id to be paid",
    example: 434242,
    required: true
  })
  @IsNumber()
  itemId: number;


  @ApiProperty({
    description: "Payment status",
    example: PaymentStatusEnum.inprogress,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;
}
