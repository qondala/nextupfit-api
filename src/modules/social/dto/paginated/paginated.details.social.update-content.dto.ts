import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '@app/common/dto';
import { DetailsSocialUpdateContentDto } from '../details/details.social.update-content.dto';

export class PaginatedDetailsSocialUpdateContentDto extends PaginatedResponseDto<DetailsSocialUpdateContentDto> {
  @ApiProperty({
    type: [DetailsSocialUpdateContentDto],
    description: 'Array of social update content items',
  })
  items: DetailsSocialUpdateContentDto[];
}
