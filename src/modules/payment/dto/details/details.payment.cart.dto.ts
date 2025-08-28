import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";

import {
  PaymentCartTypeEnum,
  PaymentStatusEnum,
} from "../../types";
import { DetailsPaymentCartItemDto } from ".";


export class DetailsPaymentCartDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  id: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    required: true,
  })
  name: string;

  @ApiProperty({
    enum: PaymentCartTypeEnum,
    enumName: "PaymentCartTypeEnum",
    required: true,
  })
  @IsEnum(PaymentCartTypeEnum)
  type: PaymentCartTypeEnum

  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: true,
  })
  @IsInt()
  userId: number;

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
    required: true,
  })
  @IsEnum(PaymentStatusEnum)
  status: PaymentStatusEnum;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: true,
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    required: true,
  })
  updatedAt: Date;

  @ApiProperty({
    type: () => DetailsPaymentCartItemDto,
    title: "DetailsPaymentCartItemDto",
    isArray: true,
    description: "Payment cart items",
    required: false,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsPaymentCartItemDto)
  items: DetailsPaymentCartItemDto[];
}
