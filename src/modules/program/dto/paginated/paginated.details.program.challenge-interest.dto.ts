import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { DetailsProgramChallengeInterestDto } from "..";

import { PaginatedResponseDto } from "@app/common/dto";

export class PaginatedDetailsProgramChallengeInterestDto extends PaginatedResponseDto<DetailsProgramChallengeInterestDto> {
  @ApiProperty({
    type: () => DetailsProgramChallengeInterestDto,
    name: "items",
    isArray: true,
    description: "List of program challenge interests",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramChallengeInterestDto)
  items: DetailsProgramChallengeInterestDto[];
}
