import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsDefined, ValidateNested } from "class-validator";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsProgramStepActivityWorkingsessionPracticeDto } from "../details";

export class PaginatedDetailsProgramStepActivityWorkingsessionPracticeDto extends PaginatedResponseDto<DetailsProgramStepActivityWorkingsessionPracticeDto> {
  @ApiProperty({
    type: () => DetailsProgramStepActivityWorkingsessionPracticeDto,
    name: "items",
    isArray: true,
    description: "List of program practices",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramStepActivityWorkingsessionPracticeDto)
  items: DetailsProgramStepActivityWorkingsessionPracticeDto[];
}
