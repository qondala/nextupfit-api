import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginatedResponseDto } from '@app/common/dto';

import { DetailsSocialUpdateDto } from '../details';

export class PaginatedDetailsSocialUpdateDto extends PaginatedResponseDto<DetailsSocialUpdateDto> {
  @ApiProperty({
    type: () => DetailsSocialUpdateDto,
    name: 'items',
    isArray: true,
    description: 'List of social updates',
    required: true
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsSocialUpdateDto)
  items: DetailsSocialUpdateDto[];
}
