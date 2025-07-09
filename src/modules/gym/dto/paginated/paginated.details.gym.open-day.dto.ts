import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymOpenDayDto } from "../details";

export class PaginatedDetailsGymOpenDayDto extends PaginatedResponseDto<DetailsGymOpenDayDto> {
  @ApiProperty({
    type: () => DetailsGymOpenDayDto,
    isArray: true,
    description: "List of gym open days",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymOpenDayDto)
  items: DetailsGymOpenDayDto[];
}
