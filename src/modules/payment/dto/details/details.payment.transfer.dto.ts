import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { PaymentStatusEnum, PaymentMethodEnum } from "../../types";

export class DetailsPaymentTransferDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  senderUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  senderManagerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  senderGymId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  receiverUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  receiverManagerId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  receiverGymId?: number;

  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: PaymentStatusEnum,
    enumName: "PaymentStatusEnum",
  })
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: true,
  })
  stripeTransferId: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: true,
  })
  operationDate: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: false,
  })
  @IsOptional()
  completionDate?: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: false,
  })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({
    enum: PaymentMethodEnum,
    enumName: "PaymentMethodEnum",
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentMethodEnum)
  paymentMethod?: PaymentMethodEnum;
}
