import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramSubscriptionPlanDto } from "../details";

export class PaginatedDetailsProgramSubscriptionPlanDto extends PaginatedResponseDto<DetailsProgramSubscriptionPlanDto> {

  @ApiProperty({
    type: () => DetailsProgramSubscriptionPlanDto,
    name: 'items',
    isArray: true,
    description: 'List of program subscription plans'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramSubscriptionPlanDto)
  items: DetailsProgramSubscriptionPlanDto[];
}
