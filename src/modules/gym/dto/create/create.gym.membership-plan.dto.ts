import {
    IsInt,
    IsOptional,
    IsString,
    IsEnum,
    IsNotEmpty
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";


export class CreateGymMembershipPlanDto {

  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Gym Id",
    example: 2323423,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  gymId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Gym membership plan",
    example: "Starter",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  planName: string;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Plan price",
    example: 2000,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  price: number;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Trial plan number days",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsInt()
  trialNumberDays?: number;


  @ApiProperty({
    enum: BaseSubscriptionPlanPeriodicityEnum,
    enumName: "BaseSubscriptionPlanPeriodicityEnum",
    description: "Membership plan periodicity",
    example: BaseSubscriptionPlanPeriodicityEnum.monthly,
    required: false,
  })
  @IsNotEmpty()
  @IsEnum(BaseSubscriptionPlanPeriodicityEnum)
  periodity: BaseSubscriptionPlanPeriodicityEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Plan description",
    example: "This plan allows you to start with the mimimum budget and upgrade later",
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  description: string;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Number activities accessible by the user within the current trial plan",
    example: 3,
    required: false,
  })
  @IsInt()
  trialNumberProgramActivities: number;
}
