import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsPaymentCreditCardDto } from "../details";

export class PaginatedDetailsPaymentCreditCardDto extends PaginatedResponseDto<DetailsPaymentCreditCardDto> {
  @ApiProperty({
    type: () => DetailsPaymentCreditCardDto,
    isArray: true,
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsPaymentCreditCardDto)
  items: DetailsPaymentCreditCardDto[];
}

