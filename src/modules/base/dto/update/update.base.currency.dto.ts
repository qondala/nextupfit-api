import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

import { BaseCurrencySymbolPositionEnum } from "../../types";

export class UpdateBaseCurrencyDto {
  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Currency symbol",
    example: "$",
    required: false,
  })
  @IsOptional()
  @IsString()
  symbol?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Currency acronym (ISO code)",
    example: "USD",
    required: false,
  })
  @IsOptional()
  @IsString()
  acronym?: string;

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Currency name",
    example: "United States Dollar",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    enum: BaseCurrencySymbolPositionEnum,
    enumName: "BaseCurrencySymbolPositionEnum",
    description: "Symbol position relative to amount",
    example: BaseCurrencySymbolPositionEnum.before,
    required: false,
  })
  @IsOptional()
  @IsEnum(BaseCurrencySymbolPositionEnum)
  symbolPosition?: BaseCurrencySymbolPositionEnum;
}
