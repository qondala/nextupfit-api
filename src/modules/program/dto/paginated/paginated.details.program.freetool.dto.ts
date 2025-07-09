import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginatedResponseDto } from '@app/common/dto';

import { DetailsProgramFreetoolDto } from '../details';

export class PaginatedDetailsProgramFreetoolDto extends PaginatedResponseDto<DetailsProgramFreetoolDto> {
  @ApiProperty({
    type: () => DetailsProgramFreetoolDto,
    name: 'items',
    isArray: true,
    description: 'List of program freetools',
    required: true
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsProgramFreetoolDto)
  items: DetailsProgramFreetoolDto[];
}
