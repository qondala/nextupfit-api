import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { DetailsGymInterestDto } from "..";

import { PaginatedResponseDto } from '@app/common/dto';

export class PaginatedDetailsGymInterestDto extends PaginatedResponseDto<DetailsGymInterestDto> {
  @ApiProperty({
    type: () => DetailsGymInterestDto,
    name: 'items',
    isArray: true,
    description: 'List of gym interests',
    required: true
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymInterestDto)
  items: DetailsGymInterestDto[];
}
