import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentGoalsItemDto } from "../../details/items";

export class PaginatedDetailsContentGoalsItemDto extends PaginatedResponseDto<DetailsContentGoalsItemDto> {
  @ApiProperty({
    type: () => DetailsContentGoalsItemDto,
    title: DetailsContentGoalsItemDto.name,
    isArray: true,
    description: "List of goal items",
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentGoalsItemDto)
  items: DetailsContentGoalsItemDto[];
}
