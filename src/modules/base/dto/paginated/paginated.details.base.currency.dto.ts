import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsBaseCurrencyDto } from "../details";

export class PaginatedDetailsBaseCurrencyDto extends PaginatedResponseDto<DetailsBaseCurrencyDto> {
  @ApiProperty({ type: () => DetailsBaseCurrencyDto, isArray: true, description: "List of currencies" })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsBaseCurrencyDto)
  items: DetailsBaseCurrencyDto[];
}
