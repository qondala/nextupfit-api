import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentOrderedlistItemDto } from "../../details/items";

export class PaginatedDetailsContentOrderedlistItemDto extends PaginatedResponseDto<DetailsContentOrderedlistItemDto> {
  @ApiProperty({
    type: () => DetailsContentOrderedlistItemDto,
    title: DetailsContentOrderedlistItemDto.name,
    isArray: true,
    description: "List of ordered list item records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentOrderedlistItemDto)
  items: DetailsContentOrderedlistItemDto[];
}
