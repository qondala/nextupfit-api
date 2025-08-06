import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { DetailsSocialAdvertisementInterestDto } from "..";

import { PaginatedResponseDto } from "@app/common/dto";

export class PaginatedDetailsSocialAdvertisementInterestDto extends PaginatedResponseDto<DetailsSocialAdvertisementInterestDto> {
  @ApiProperty({
    type: () => DetailsSocialAdvertisementInterestDto,
    name: "items",
    isArray: true,
    description: "List of social advertisement interests",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsSocialAdvertisementInterestDto)
  items: DetailsSocialAdvertisementInterestDto[];
}
