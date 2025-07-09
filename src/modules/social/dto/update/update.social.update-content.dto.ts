import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt } from 'class-validator';
import { SwaggerType } from '@app/common/types';

export class UpdateSocialUpdateContentDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the social update',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  socialUpdateId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the content',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  contentId?: number;
}
