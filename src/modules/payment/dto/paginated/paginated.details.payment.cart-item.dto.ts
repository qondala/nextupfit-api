import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsPaymentCartItemDto } from "../details";

export class PaginatedDetailsPaymentCartItemDto extends PaginatedResponseDto<DetailsPaymentCartItemDto> {
  @ApiProperty({
    type: () => DetailsPaymentCartItemDto,
    name: "items",
    isArray: true,
    description: "Payment cart item's list elements",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsPaymentCartItemDto)
  items: DetailsPaymentCartItemDto[];
}
