import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramStepActivityDto } from "../details";

export class PaginatedDetailsProgramStepActivityDto extends PaginatedResponseDto<DetailsProgramStepActivityDto> {

  @ApiProperty({
    type: () => DetailsProgramStepActivityDto,
    name: 'items',
    isArray: true,
    description: 'List of program step activities'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramStepActivityDto)
  items: DetailsProgramStepActivityDto[];
}
