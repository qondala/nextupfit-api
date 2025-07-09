import {
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDate,
  IsEnum
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { GymMembershipStatusEnum } from "../../types";

export class UpdateGymMembershipPlanDto {

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "UserId of the member",
    example: 256789,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  memberUserId?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date user started being member",
    example: "2025-04-15",
    required: false,
  })
  @IsOptional()
  @IsDate()
  startedDate?: Date;


  @ApiProperty({
    enum: GymMembershipStatusEnum,
    enumName: "GymMembershipStatusEnum",
    description: "Membership status of the user",
    example: GymMembershipStatusEnum.active,
    required: false,
  })
  @IsOptional()
  @IsEnum(GymMembershipStatusEnum)
  membershipStatus?: GymMembershipStatusEnum;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Gym id",
    example: 345,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date user stopped being member of the Gym",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  stoppedDate?: Date;

  @ApiProperty({
    type: SwaggerType.BOOLEAN,
    description: "Whether user is favorire member of the Gym (Like page top fan on Facebook)",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Date the user's membership to the gym has been suspended",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  suspendedDate?: Date;
}

