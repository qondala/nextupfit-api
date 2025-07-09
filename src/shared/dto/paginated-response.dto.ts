import { ApiProperty } from '@nestjs/swagger';
import { SwaggerType } from '@app/common/types';

export class PaginationMetaDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Total number of items'
  })
  totalItems?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Number of items on current page'
  })
  itemCount?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Number of items per page'
  })
  itemsPerPage?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Total number of pages'
  })
  totalPages?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Current page number'
  })
  currentPage?: number;
}

export class PaginatedResponseDto<T> {
  items: T[];

  @ApiProperty({
    type: PaginationMetaDto,
    title: PaginationMetaDto.name,
    description: 'Pagination metadata',
  })
  meta: PaginationMetaDto;
}
