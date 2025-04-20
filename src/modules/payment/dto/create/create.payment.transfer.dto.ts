import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PaymentStatusEnum } from "../../types";


export class CreatePaymentTransferDto {
  @ApiProperty({
    description: "Sender user Id",
    example: 23234,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  senderUserId: number;


  @ApiProperty({
    description: "Sender gym Id",
    example: 434,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  senderGymId: number;


  @ApiProperty({
    description: "Receiver user Id",
    example: 3453445,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  receiverUserId: number;


  @ApiProperty({
    description: "Amount transfered",
    example: 1000,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  amountTransferred: number;

  @ApiProperty({
    description: "Payment currency",
    example: "usd",
    required: true
  })
  @IsNotEmpty()
  @IsString()
  currency: string;

  
  @ApiProperty({
    description: "Transfer date",
    example: Date(),
    required: false
  })
  @IsNotEmpty()
  @IsDate()
  operationDate?: Date;


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
    description: "Transfer status",
    example: PaymentStatusEnum.inprogress,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;
}
