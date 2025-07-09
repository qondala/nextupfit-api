import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsContentUnorderedlistDto } from "../details";

export class PaginatedDetailsContentUnorderedlistDto extends PaginatedResponseDto<DetailsContentUnorderedlistDto> {
  @ApiProperty({
    type: () => DetailsContentUnorderedlistDto,
    title: DetailsContentUnorderedlistDto.name,
    isArray: true,
    description: "List of unorderedlist content records",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsContentUnorderedlistDto)
  items: DetailsContentUnorderedlistDto[];
}
