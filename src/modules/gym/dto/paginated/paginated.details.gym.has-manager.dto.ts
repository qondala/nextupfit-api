import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymHasManagerDto } from "../details";

export class PaginatedDetailsGymHasManagerDto extends PaginatedResponseDto<DetailsGymHasManagerDto> {
  @ApiProperty({
    type: () => DetailsGymHasManagerDto,
    name: "items",
    isArray: true,
    description: "List of gym has managers",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymHasManagerDto)
  items: DetailsGymHasManagerDto[];
}
