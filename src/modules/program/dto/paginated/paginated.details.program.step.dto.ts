import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramStepDto } from "../details";

export class PaginatedDetailsProgramStepDto extends PaginatedResponseDto<DetailsProgramStepDto> {

  @ApiProperty({
    type: () => DetailsProgramStepDto,
    name: 'items',
    isArray: true,
    description: 'List of program steps'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramStepDto)
  items: DetailsProgramStepDto[];
}
