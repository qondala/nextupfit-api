import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramSubscriptionDto } from "..";

export class PaginatedDetailsProgramSubscriptionDto extends PaginatedResponseDto<DetailsProgramSubscriptionDto> {

  @ApiProperty({
    type: () => DetailsProgramSubscriptionDto,
    name: 'items',
    isArray: true,
    description: 'List of program subscriptions',
    required: true
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramSubscriptionDto)
  items: DetailsProgramSubscriptionDto[];
}