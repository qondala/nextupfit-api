import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsPaymentDto } from "../details";

export class PaginatedDetailsPaymentDto extends PaginatedResponseDto<DetailsPaymentDto> {
  @ApiProperty({ type: () => DetailsPaymentDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsPaymentDto)
  items: DetailsPaymentDto[];
}
