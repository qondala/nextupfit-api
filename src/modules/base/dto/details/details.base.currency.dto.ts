import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

import { SwaggerType } from "@app/common/types";

import { BaseCurrencySymbolPositionEnum } from "../../types";

export class DetailsBaseCurrencyDto {
  @ApiProperty({ type: SwaggerType.INTEGER, description: "Identifier", example: 1 })
  @IsNumber()
  id: number;

  @ApiProperty({ type: SwaggerType.STRING, description: "Currency symbol", example: "$" })
  @IsString()
  @IsNotEmpty()
  symbol: string;

  @ApiProperty({ type: SwaggerType.STRING, description: "Currency acronym", example: "USD" })
  @IsString()
  @IsNotEmpty()
  acronym: string;

  @ApiProperty({ type: SwaggerType.STRING, description: "Currency name", example: "United States Dollar" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: BaseCurrencySymbolPositionEnum,
    enumName: "BaseCurrencySymbolPositionEnum",
    description: "Symbol position relative to amount",
    example: BaseCurrencySymbolPositionEnum.before,
  })
  @IsEnum(BaseCurrencySymbolPositionEnum)
  symbolPosition: BaseCurrencySymbolPositionEnum;

  @ApiProperty({ type: SwaggerType.STRING, format: "date-time", description: "Creation timestamp" })
  createdAt: Date;

  @ApiProperty({ type: SwaggerType.STRING, format: "date-time", description: "Last update timestamp" })
  updatedAt: Date;
}
