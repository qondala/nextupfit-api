import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramActivityContentDto } from "../details";


export class PaginatedDetailsProgramActivityContentDto extends PaginatedResponseDto<DetailsProgramActivityContentDto> {

  @ApiProperty({
    type: () => DetailsProgramActivityContentDto,
    name: 'items',
    isArray: true,
    description: 'List of program activity content'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramActivityContentDto)
  items: DetailsProgramActivityContentDto[];
}
