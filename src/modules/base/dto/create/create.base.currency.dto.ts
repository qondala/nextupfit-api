import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

import { BaseCurrencySymbolPositionEnum } from "../../types";

export class CreateBaseCurrencyDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Currency symbol",
    example: "$",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Currency acronym (ISO code)",
    example: "USD",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  acronym: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Currency name",
    example: "United States Dollar",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    enum: BaseCurrencySymbolPositionEnum,
    enumName: "BaseCurrencySymbolPositionEnum",
    description: "Symbol position relative to amount",
    example: BaseCurrencySymbolPositionEnum.before,
    required: false,
  })
  @IsEnum(BaseCurrencySymbolPositionEnum)
  symbolPosition?: BaseCurrencySymbolPositionEnum;
}
