import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginatedResponseDto } from '@app/common/dto';

import { DetailsGymHasProgramDto } from '../details';

export class PaginatedDetailsGymHasProgramDto extends PaginatedResponseDto<DetailsGymHasProgramDto> {
  @ApiProperty({
    type: () => DetailsGymHasProgramDto,
    name: 'items',
    isArray: true,
    description: 'List of gym has programs',
    required: true
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymHasProgramDto)
  items: DetailsGymHasProgramDto[];
}
