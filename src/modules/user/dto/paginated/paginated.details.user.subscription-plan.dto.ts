import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsUserSubscriptionPlanDto } from "../details";

export class PaginatedDetailsUserSubscriptionPlanDto extends PaginatedResponseDto<DetailsUserSubscriptionPlanDto> {

  @ApiProperty({
    type: () => DetailsUserSubscriptionPlanDto,
    name: 'items',
    isArray: true,
    description: 'List of users subscription plans'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsUserSubscriptionPlanDto)
  items: DetailsUserSubscriptionPlanDto[];
}
