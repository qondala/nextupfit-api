import {
    IsNumber,
    IsOptional,
    IsString,
    IsEnum,
    IsNotEmpty
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";


export class CreateGymMembershipPlanDto {

  @ApiProperty({
    description: "Gym Id",
    example: 2323423,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  gymId: number;


  @ApiProperty({
    description: "Gym membership plan",
    example: "Starter",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  planName: string;


  @ApiProperty({
    description: "Plan price",
    example: 2000,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;


  @ApiProperty({
    description: "Trial plan number days",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  trialNumberDays?: number;


  @ApiProperty({
    description: "Membership plan periodicity",
    example: BaseSubscriptionPlanPeriodicityEnum.monthly,
    required: false,
  })
  @IsNotEmpty()
  @IsEnum(BaseSubscriptionPlanPeriodicityEnum)
  periodity: BaseSubscriptionPlanPeriodicityEnum;


  @ApiProperty({
    description: "Plan description",
    example: "This plan allows you to start with the mimimum budget and upgrade later",
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({
    description: "Number activities accessible by the user within the current trial plan",
    example: 3,
    required: false,
  })
  @IsNumber()
  trialNumberProgramActivities: number;
}
