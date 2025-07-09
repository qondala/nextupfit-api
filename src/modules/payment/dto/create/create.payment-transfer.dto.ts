import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, IsInt } from "class-validator";

import { SwaggerType } from "@app/common/types";

import { PaymentStatusEnum, PaymentMethodEnum } from "../../types";

export class CreatePaymentTransferDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Receiver user id",
  })
  @IsInt()
  receiverUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Receiver manager id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  receiverManagerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Receiver gym id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  receiverGymId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Sender manager id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  senderManagerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Sender gym id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  senderGymId?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Transfer amount",
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: PaymentStatusEnum,
    enumName: "PaymentStatusEnum",
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentStatusEnum)
  status?: PaymentStatusEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Stripe transfer id",
  })
  @IsString()
  stripeTransferId: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: false,
  })
  @IsOptional()
  operationDate?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: false,
  })
  @IsOptional()
  completionDate?: Date;

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
    description: "Message",
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;
}
