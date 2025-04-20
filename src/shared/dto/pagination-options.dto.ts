import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';


export class PaginationOptionsDto {
  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    default: 1,
    type: Number
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Number of items per page',
    default: 10,
    type: Number
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit: number = 10;
}
