import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { DetailsSocialUpdateInterestDto } from "..";

import { PaginatedResponseDto } from "@app/common/dto";

export class PaginatedDetailsSocialUpdateInterestDto extends PaginatedResponseDto<DetailsSocialUpdateInterestDto> {
  @ApiProperty({
    type: () => DetailsSocialUpdateInterestDto,
    name: "items",
    isArray: true,
    description: "List of social update interests",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsSocialUpdateInterestDto)
  items: DetailsSocialUpdateInterestDto[];
}
