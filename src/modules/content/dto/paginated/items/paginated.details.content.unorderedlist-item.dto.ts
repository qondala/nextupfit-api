import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentUnorderedlistItemDto } from "../../details/items";

export class PaginatedDetailsContentUnorderedlistItemDto extends PaginatedResponseDto<DetailsContentUnorderedlistItemDto> {
  @ApiProperty({
    type: () => DetailsContentUnorderedlistItemDto,
    title: DetailsContentUnorderedlistItemDto.name,
    isArray: true,
    description: "List of unorderedlist item records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentUnorderedlistItemDto)
  items: DetailsContentUnorderedlistItemDto[];
}
