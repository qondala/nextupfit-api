import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { PaginatedResponseDto } from "@app/common/dto";
import { DetailsGymManagerDto } from "../details";


export class PaginatedDetailsGymManagerDto extends PaginatedResponseDto<DetailsGymManagerDto> {

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    name: 'items',
    isArray: true,
    description: 'List of gym managers'
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymManagerDto)
  items: DetailsGymManagerDto[];
}
