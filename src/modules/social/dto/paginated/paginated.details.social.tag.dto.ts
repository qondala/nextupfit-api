import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsSocialTagDto } from "../details";

export class PaginatedDetailsSocialTagDto extends PaginatedResponseDto<DetailsSocialTagDto> {
  @ApiProperty({
    type: () => DetailsSocialTagDto,
    name: "items",
    isArray: true,
    description: "List of tags",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsSocialTagDto)
  items: DetailsSocialTagDto[];
}
