import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";

import { DetailsContentPrerequisitesItemDto } from "../../details/items";

export class PaginatedDetailsContentPrerequisitesItemDto extends PaginatedResponseDto<DetailsContentPrerequisitesItemDto> {
  @ApiProperty({
    type: () => DetailsContentPrerequisitesItemDto,
    title: DetailsContentPrerequisitesItemDto.name,
    isArray: true,
    description: "List of prerequisites item records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentPrerequisitesItemDto)
  items: DetailsContentPrerequisitesItemDto[];
}
