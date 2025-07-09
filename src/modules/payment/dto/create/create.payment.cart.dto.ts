import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsInt } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { PaymentStatusEnum } from "../../types";

export class CreatePaymentCartDto {
  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Amount",
    required: true,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    required: true,
  })
  @IsInt()
  userId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Currency id",
    required: false,
  })
  @IsOptional()
  @IsInt()
  currencyId?: number;

  @ApiProperty({
    enum: PaymentStatusEnum,
    enumName: "PaymentStatusEnum",
    required: false,
  })
  @IsOptional()
  @IsEnum(PaymentStatusEnum)
  status?: PaymentStatusEnum;
}
