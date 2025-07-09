import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsPaymentTransferDto } from "../details";

export class PaginatedDetailsPaymentTransferDto extends PaginatedResponseDto<DetailsPaymentTransferDto> {
  @ApiProperty({ type: () => DetailsPaymentTransferDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsPaymentTransferDto)
  items: DetailsPaymentTransferDto[];
}
