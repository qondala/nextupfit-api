import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsPaymentCartDto } from "../details";

export class PaginatedDetailsPaymentCartDto extends PaginatedResponseDto<DetailsPaymentCartDto> {
  @ApiProperty({ type: () => DetailsPaymentCartDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsPaymentCartDto)
  items: DetailsPaymentCartDto[];
}
