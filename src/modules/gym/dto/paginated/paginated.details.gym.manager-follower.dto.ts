import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymManagerFollowerDto } from "../details";

export class PaginatedDetailsGymManagerFollowerDto extends PaginatedResponseDto<DetailsGymManagerFollowerDto> {
  @ApiProperty({
    type: () => DetailsGymManagerFollowerDto,
    isArray: true,
    description: "List of gym manager followers",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerFollowerDto)
  items: DetailsGymManagerFollowerDto[];
}
