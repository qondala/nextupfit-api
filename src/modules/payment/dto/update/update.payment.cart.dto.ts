import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsNumber, IsInt } from "class-validator";

import { SwaggerType } from "@app/common/types";
import { PaymentStatusEnum } from "../../types";

export class UpdatePaymentCartDto {
  @ApiProperty({
    type: SwaggerType.NUMBER,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    required: false,
  })
  @IsOptional()
  @IsInt()
  userId?: number;

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
  })
  @IsOptional()
  @IsEnum(PaymentStatusEnum)
  status?: PaymentStatusEnum;
}
