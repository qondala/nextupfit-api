import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";

import { DetailsUserDto } from '@app/module/user/dto';
import { SwaggerType } from "@app/common/types";

import { DetailsGymDto, DetailsGymMembershipPlanDto} from '.';
import { GymMembershipStatusEnum } from '../../types';


export class DetailsGymMembershipDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym membership',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym membership member user',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  memberUserId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Started date of the gym membership',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  startedDate?: Date;


  @ApiProperty({
    enum: GymMembershipStatusEnum,
    enumName: "GymMembershipStatusEnum",
    title: "GymMembershipStatusEnum",
    example: GymMembershipStatusEnum.active,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(GymMembershipStatusEnum)
  membershipStatus: GymMembershipStatusEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Stopped date of the gym membership',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  stoppedDate?: Date;


  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Favorite status of the gym membership',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Suspended date of the gym membership',
    example: '2022-01-01T00:00:00.000Z',
    required: false,
  })
  @IsOptional()
  @Type(() => Date)
  suspendedDate: Date;


  @ApiProperty({
    type: () => DetailsGymMembershipPlanDto,
    title: "DetailsGymMembershipPlanDto",
    description: 'Membership plan of the gym membership',
    required: true,
  })
  @Type(() => DetailsGymMembershipPlanDto)
  membershipPlan: DetailsGymMembershipPlanDto;


  @ApiProperty({
    type: () => DetailsUserDto,
    title: "DetailsUserDto",
    description: 'Member of the gym membership',
    required: true,
  })
  @Type(() => DetailsUserDto)
  member: DetailsUserDto;


  @ApiProperty({
    type: () => DetailsGymDto,
    title: "DetailsGymDto",
    description: 'Gym of the gym membership',
    required: true,
  })
  @Type(() => DetailsGymDto)
  gym: DetailsGymDto;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Created at of the gym membership',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  createdAt: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Updated at of the gym membership',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Date)
  updatedAt: Date;
}
