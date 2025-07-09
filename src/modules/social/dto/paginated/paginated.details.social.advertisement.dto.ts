import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsSocialAdvertisementDto } from "../details";

export class PaginatedDetailsSocialAdvertisementDto extends PaginatedResponseDto<DetailsSocialAdvertisementDto> {

  @ApiProperty({
    type: () => DetailsSocialAdvertisementDto,
    name: "items",
    isArray: true,
    description: "List of social advertisements",
    required: true
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsSocialAdvertisementDto)
  items: DetailsSocialAdvertisementDto[];
}
