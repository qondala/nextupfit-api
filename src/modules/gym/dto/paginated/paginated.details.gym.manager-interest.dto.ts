import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { DetailsGymManagerInterestDto } from "..";

import { PaginatedResponseDto } from "@app/common/dto";

export class PaginatedDetailsGymManagerInterestDto extends PaginatedResponseDto<DetailsGymManagerInterestDto> {
  @ApiProperty({
    type: () => DetailsGymManagerInterestDto,
    name: "items",
    isArray: true,
    description: "List of gym manager interests",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerInterestDto)
  items: DetailsGymManagerInterestDto[];
}
