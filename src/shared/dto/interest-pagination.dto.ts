import { ApiProperty } from '@nestjs/swagger';
import { PaginationOptionsDto } from '.';

export class InterestPaginationDto {
  @ApiProperty({
    type: PaginationOptionsDto,
    title: PaginationOptionsDto.name,
    description: 'Pagination global options',
    required: false,
  })
  global?: PaginationOptionsDto;

  @ApiProperty({
    type: PaginationOptionsDto,
    title: PaginationOptionsDto.name,
    description: 'Pagination local options',
    required: false,
  })
  local?: PaginationOptionsDto;

  @ApiProperty({
    type: PaginationOptionsDto,
    title: PaginationOptionsDto.name,
    description: 'Pagination user options',
    required: false,
  })
  user?: PaginationOptionsDto;
}
