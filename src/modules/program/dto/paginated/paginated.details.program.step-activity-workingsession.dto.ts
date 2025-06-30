import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsProgramStepActivityWorkingsessionDto } from "../details";

export class PaginatedDetailsProgramStepActivityWorkingsessionDto extends PaginatedResponseDto<DetailsProgramStepActivityWorkingsessionDto> {

  @ApiProperty({
    type: () => DetailsProgramStepActivityWorkingsessionDto,
    name: 'items',
    isArray: true,
    description: 'List of program step activity working sessions'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramStepActivityWorkingsessionDto)
  items: DetailsProgramStepActivityWorkingsessionDto[];
}
