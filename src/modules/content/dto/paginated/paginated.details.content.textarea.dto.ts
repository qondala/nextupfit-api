import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentTextareaDto } from "../details";

export class PaginatedDetailsContentTextareaDto extends PaginatedResponseDto<DetailsContentTextareaDto> {
  @ApiProperty({
    type: () => DetailsContentTextareaDto,
    title: DetailsContentTextareaDto.name,
    isArray: true,
    description: "List of textarea content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentTextareaDto)
  items: DetailsContentTextareaDto[];
}
