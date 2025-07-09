import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { SwaggerType } from '@app/common/types';
import {
  SocialActorEnum,
  SocialUpdateTypeEnum,
  SocialUpdatePrivacyEnum
} from '../../types';
import { DetailsUserDto } from '@app/module/user/dto';
import { DetailsGymManagerDto } from '@app/module/gym/dto';

export class DetailsSocialUpdateDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The unique identifier of the social update record',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the author user',
    example: 1,
  })
  authorUserId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the author manager',
    example: 1,
    nullable: true,
    required: false,
  })
  authorManagerId: number;

  @ApiProperty({
    enum: SocialActorEnum,
    enumName: "SocialActorEnum",
    description: 'The type of social actor',
    example: SocialActorEnum.user,
  })
  socialActorType: SocialActorEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'The ID of the social actor',
    example: 1,
  })
  socialActorId: number;

  @ApiProperty({
    enum: SocialUpdateTypeEnum,
    enumName: "SocialUpdateTypeEnum",
    description: 'The type of social update',
    example: SocialUpdateTypeEnum.status,
  })
  socialUpdateType: SocialUpdateTypeEnum;

  @ApiProperty({
    enum: SocialUpdatePrivacyEnum,
    enumName: "SocialUpdatePrivacyEnum",
    description: 'The privacy setting for the social update',
    example: SocialUpdatePrivacyEnum.public,
  })
  privacy: SocialUpdatePrivacyEnum;

  @ApiProperty({
    type: SwaggerType.DATE,
    format: 'date-time',
    description: 'The creation timestamp',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.DATE,
    format: 'date-time',
    description: 'The update timestamp',
    example: '2023-01-01T00:00:00.000Z',
    nullable: true,
    required: false,
  })
  updateAt: Date;

  @ApiProperty({
    type: () => DetailsUserDto,
    title: "DetailsUserDto",
    description: 'Author user of the social update',
    required: true,
  })
  @Type(() => DetailsUserDto)
  authorUser: DetailsUserDto;

  @ApiProperty({
    type: () => DetailsGymManagerDto,
    title: "DetailsGymManagerDto",
    description: 'Author manager of the social update',
    required: false,
  })
  @Type(() => DetailsGymManagerDto)
  authorManager?: DetailsGymManagerDto;
}
