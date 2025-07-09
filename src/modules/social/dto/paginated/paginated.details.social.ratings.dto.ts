import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsSocialRatingsDto } from "../details";

export class PaginatedDetailsSocialRatingsDto extends PaginatedResponseDto<DetailsSocialRatingsDto> {
  @ApiProperty({
    type: () => DetailsSocialRatingsDto,
    name: "items",
    isArray: true,
    description: "List of ratings records"
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsSocialRatingsDto)
  items: DetailsSocialRatingsDto[];
}
