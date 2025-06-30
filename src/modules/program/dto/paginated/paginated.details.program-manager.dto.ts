import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramManagerDto } from "../details";

export class PaginatedDetailsProgramManagerDto extends PaginatedResponseDto<DetailsProgramManagerDto> {

  @ApiProperty({
    type: () => DetailsProgramManagerDto,
    name: 'items',
    isArray: true,
    description: 'List of program managers'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramManagerDto)
  items: DetailsProgramManagerDto[];
}
