import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramDto } from "../details";

export class PaginatedDetailsProgramDto extends PaginatedResponseDto<DetailsProgramDto> {

  @ApiProperty({
    type: () => DetailsProgramDto,
    name: 'items',
    isArray: true,
    description: 'List of programs'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramDto)
  items: DetailsProgramDto[];
}
