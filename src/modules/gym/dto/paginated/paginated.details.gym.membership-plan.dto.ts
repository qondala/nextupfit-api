import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymMembershipPlanDto } from "../details";

export class PaginatedDetailsGymMembershipPlanDto extends PaginatedResponseDto<DetailsGymMembershipPlanDto> {
  @ApiProperty({
    type: () => DetailsGymMembershipPlanDto,
    isArray: true,
    description: "List of gym membership plans",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymMembershipPlanDto)
  items: DetailsGymMembershipPlanDto[];
}
