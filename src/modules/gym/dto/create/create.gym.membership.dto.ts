import {
    IsNumber,
    IsOptional,
    IsBoolean,
    IsDate,
    IsEnum, 
    IsNotEmpty} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { GymMembershipStatusEnum } from "../../types";
  
export class CreateGymMembershipDto {

  @ApiProperty({
    description: "UserId of the member",
    example: 256789,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  memberUserId: number;


  @ApiProperty({
    description: "Date user started being member",
    example: "2025-04-15",
    required: false,
  })
  @IsOptional()
  @IsDate()
  startedDate?: Date;


  @ApiProperty({
    description: "Membership status of the user",
    example: GymMembershipStatusEnum.active,
    required: false,
  })
  @IsOptional()
  @IsEnum(GymMembershipStatusEnum)
  membershipStatus?: GymMembershipStatusEnum;


  @ApiProperty({
    description: "Gym id",
    example: 345,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    description: "Date user stopped being member of the Gym",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  stoppedDate?: Date;

  @ApiProperty({
    description: "Whether user is favorire member of the Gym (Like page top fan on Facebook)",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;

  @ApiProperty({
    description: "Date the user's membership to the gym has been suspended",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  suspendedDate: Date;
}
