import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { DetailsProgramInterestDto } from "..";

import { PaginatedResponseDto } from "@app/common/dto";

export class PaginatedDetailsProgramInterestDto extends PaginatedResponseDto<DetailsProgramInterestDto> {
  @ApiProperty({
    type: () => DetailsProgramInterestDto,
    name: "items",
    isArray: true,
    description: "List of program interests",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramInterestDto)
  items: DetailsProgramInterestDto[];
}
