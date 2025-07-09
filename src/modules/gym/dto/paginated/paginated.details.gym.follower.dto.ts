import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymFollowerDto } from "../details";

export class PaginatedDetailsGymFollowerDto extends PaginatedResponseDto<DetailsGymFollowerDto> {
  @ApiProperty({
    type: () => DetailsGymFollowerDto,
    isArray: true,
    description: "List of gym followers",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymFollowerDto)
  items: DetailsGymFollowerDto[];
}
