import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentTipsDto } from "../details";

export class PaginatedDetailsContentTipsDto extends PaginatedResponseDto<DetailsContentTipsDto> {
  @ApiProperty({
    type: () => DetailsContentTipsDto,
    title: DetailsContentTipsDto.name,
    isArray: true,
    description: "List of tips records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentTipsDto)
  items: DetailsContentTipsDto[];
}
