import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentTipsItemDto } from "../../details/items";

export class PaginatedDetailsContentTipsItemDto extends PaginatedResponseDto<DetailsContentTipsItemDto> {
  @ApiProperty({
    type: () => DetailsContentTipsItemDto,
    title: DetailsContentTipsItemDto.name,
    isArray: true,
    description: "List of tips item records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentTipsItemDto)
  items: DetailsContentTipsItemDto[];
}
