import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsMapDto } from "../details";

export class PaginatedDetailsMapDto extends PaginatedResponseDto<DetailsMapDto> {
  @ApiProperty({
    type: () => DetailsMapDto,
    // title: `DetailsMapDto[]`,
    name: 'items',
    isArray: true,
    description: 'List of map locations',
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsMapDto)
  items: DetailsMapDto[];
}