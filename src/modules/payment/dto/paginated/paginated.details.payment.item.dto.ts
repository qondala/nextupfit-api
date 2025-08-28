import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { PaginatedResponseDto } from '@app/common/dto';
import { DetailsPaymentItemDto } from '../details';

export class PaginatedDetailsPaymentItemDto extends PaginatedResponseDto<DetailsPaymentItemDto> {
  @ApiProperty({
    type: () => DetailsPaymentItemDto,
    isArray: true,
    required: true,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsPaymentItemDto)
  items: DetailsPaymentItemDto[];
}
