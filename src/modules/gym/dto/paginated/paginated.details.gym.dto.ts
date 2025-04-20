import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymDto } from "../details";

export class PaginatedDetailsGymDto extends PaginatedResponseDto<DetailsGymDto> {

  @ApiProperty({
    type: () => DetailsGymDto,
    name: 'items',
    isArray: true,
    description: 'List of gyms'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymDto)
  items: DetailsGymDto[];
}
