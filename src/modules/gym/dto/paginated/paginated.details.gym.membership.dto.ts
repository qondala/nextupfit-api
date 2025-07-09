import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymMembershipDto } from "../details";

export class PaginatedDetailsGymMembershipDto extends PaginatedResponseDto<DetailsGymMembershipDto> {
  @ApiProperty({
    type: () => DetailsGymMembershipDto,
    isArray: true,
    description: "List of gym memberships",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymMembershipDto)
  items: DetailsGymMembershipDto[];
}
