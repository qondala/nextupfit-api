import { IsOptional, IsEnum, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { SwaggerType } from '@app/common/types';
import {
  SocialActorEnum,
  SocialUpdateTypeEnum,
  SocialUpdatePrivacyEnum
} from '../../types';

export class UpdateSocialUpdateDto {
  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: 'The ID of the author user',
  })
  @IsOptional()
  @IsInt()
  authorUserId?: number;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: 'The ID of the author manager',
  })
  @IsOptional()
  @IsInt()
  authorManagerId?: number;

  @ApiPropertyOptional({
    enum: SocialActorEnum,
    enumName: "SocialActorEnum",
    description: 'The type of social actor',
  })
  @IsOptional()
  @IsEnum(SocialActorEnum)
  socialActorType?: SocialActorEnum;

  @ApiPropertyOptional({
    type: SwaggerType.INTEGER,
    description: 'The ID of the social actor',
  })
  @IsOptional()
  @IsInt()
  socialActorId?: number;

  @ApiPropertyOptional({
    enum: SocialUpdateTypeEnum,
    enumName: "SocialUpdateTypeEnum",
    description: 'The type of social update',
  })
  @IsOptional()
  @IsEnum(SocialUpdateTypeEnum)
  socialUpdateType?: SocialUpdateTypeEnum;

  @ApiPropertyOptional({
    enum: SocialUpdatePrivacyEnum,
    enumName: "SocialUpdatePrivacyEnum",
    description: 'The privacy setting for the social update',
  })
  @IsOptional()
  @IsEnum(SocialUpdatePrivacyEnum)
  privacy?: SocialUpdatePrivacyEnum;
}
