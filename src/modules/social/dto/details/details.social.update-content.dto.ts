import { ApiProperty } from '@nestjs/swagger';
import { SwaggerType } from '@app/common/types';
import { DetailsSocialUpdateDto } from './details.social.update.dto';

export class DetailsSocialUpdateContentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The unique identifier of the social update content',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the social update',
    example: 1,
  })
  socialUpdateId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the content',
    example: 1,
  })
  contentId: number;

  @ApiProperty({
    type: DetailsSocialUpdateDto,
    description: 'The social update details',
    required: false,
  })
  socialUpdate?: DetailsSocialUpdateDto;
}
