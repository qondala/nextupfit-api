import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { DetailsProgramFreetoolInterestDto } from "..";

import { PaginatedResponseDto } from '@app/common/dto';

export class PaginatedDetailsProgramFreetoolInterestDto extends PaginatedResponseDto<DetailsProgramFreetoolInterestDto> {
  @ApiProperty({
    type: () => DetailsProgramFreetoolInterestDto,
    name: 'items',
    isArray: true,
    description: 'List of program freetool interests',
    required: true
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramFreetoolInterestDto)
  items: DetailsProgramFreetoolInterestDto[];
}
