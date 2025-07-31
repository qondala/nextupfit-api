import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsInt,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { SwaggerType } from "@app/common/types";
import { GymMembershipStatusEnum } from "@app/module/gym/types";


import { UserPlanTrialStatus } from "..";


export class UserGymMembershipPlanStatus {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'ID of the gym membership',
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
    description: 'ID of the gym membership member user',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  memberUserId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Gym membership plan id',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gymMembershipPlanId: number;


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
    description: 'Created at of the gym membership',
    example: '2022-01-01T00:00:00.000Z',
    required: true,
  })
  @IsNotEmpty()
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Paid status of the gym membership',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  paid: boolean;

  @ApiProperty({
    type: () =>UserPlanTrialStatus,
    description: 'Trial status of the gym membership',
    example: false,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserPlanTrialStatus)
  trialStatus?: UserPlanTrialStatus;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: 'Tells if user has ever subscribed to the gym membership plan',
    example: true,
    required: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  userPlanExists: boolean;
}
