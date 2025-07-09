import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { SwaggerType } from '@app/common/types';
import { DetailsUserDto } from '@app/module/user/dto';

export class DetailsGymManagerRequestDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym manager request',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gymId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the applicant user',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  applicantUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Letter of the gym manager request',
    example: 'Letter of the gym manager request',
    required: false,
  })
  @IsOptional()
  @IsString()
  letter?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Portfolio URL of the gym manager request',
    example: 'Portfolio URL of the gym manager request',
    required: false,
  })
  @IsOptional()
  @IsString()
  portfolioUrl?: string;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: 'Document URL of the gym manager request',
    example: 'Document URL of the gym manager request',
    required: false,
  })
  @IsOptional()
  @IsString()
  documentUrl?: string;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Favorite of the gym manager request',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  favorite?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Accepted of the gym manager request',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  accepted?: boolean;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Rejected of the gym manager request',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  rejected?: boolean;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Accepted date of the gym manager request',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  acceptedDate?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Rejected date of the gym manager request',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  rejectedDate: Date;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Accepted by gym manager user id of the gym manager request',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  acceptedByGymManagerUserId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Rejected by gym manager user id of the gym manager request',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  rejectedByGymManagerUserId: number;


  @ApiProperty({
    type: () => DetailsUserDto,
    title: "DetailsUserDto",
    description: 'Applicant of the gym manager request',
    required: true,
  })
  @Type(() => DetailsUserDto)
  applicant: DetailsUserDto;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Created at of the gym manager request',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Updated at of the gym manager request',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
