import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymManagerRequestDto } from "../details";

export class PaginatedDetailsGymManagerRequestDto extends PaginatedResponseDto<DetailsGymManagerRequestDto> {
  @ApiProperty({
    type: () => DetailsGymManagerRequestDto,
    isArray: true,
    description: "List of gym manager requests",
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerRequestDto)
  items: DetailsGymManagerRequestDto[];
}
