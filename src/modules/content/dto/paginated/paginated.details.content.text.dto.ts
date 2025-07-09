import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentTextDto } from "../details";

export class PaginatedDetailsContentTextDto extends PaginatedResponseDto<DetailsContentTextDto> {
  @ApiProperty({
    type: () => DetailsContentTextDto,
    title: DetailsContentTextDto.name,
    isArray: true,
    description: "List of text content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentTextDto)
  items: DetailsContentTextDto[];
}
