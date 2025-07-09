import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymManagerOverviewDto } from "../details";

export class PaginatedDetailsGymManagerOverviewDto extends PaginatedResponseDto<DetailsGymManagerOverviewDto> {
  @ApiProperty({
    type: () => DetailsGymManagerOverviewDto,
    isArray: true,
    description: "List of gym manager overviews",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerOverviewDto)
  items: DetailsGymManagerOverviewDto[];
}
