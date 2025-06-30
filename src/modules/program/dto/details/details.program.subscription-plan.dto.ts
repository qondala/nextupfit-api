import {
  IsNumber,
  IsDate,
  IsString,
  IsEnum,
  IsNotEmpty
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";


export class DetailsProgramSubscriptionPlanDto {

  @ApiProperty({
    type: Number,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;


  @ApiProperty({
    description: "Program subscription plan",
    example:"Starter",
    required: true,
  })
  @IsNumber()
  planName: string;


  @ApiProperty({
    description: "Plan price",
    example: Date(),
    required: true,
  })
  @IsNumber()
  price: number;


  @ApiProperty({
    description: "Trial plan number days",
    example: 10,
    required: false,
  })
  @IsNumber()
  trialNumberDays: number;


  @ApiProperty({
    description: "Subscription plan periodicity",
    example: BaseSubscriptionPlanPeriodicityEnum.monthly,
    required: false,
  })
  @IsEnum(BaseSubscriptionPlanPeriodicityEnum)
  periodity: BaseSubscriptionPlanPeriodicityEnum;


  @ApiProperty({
    description: "Subscription plan description",
    example: "This plan allows you to start with the mimimum budget and upgrade later",
    required: false,
  })
  @IsString()
  description: string;


  @ApiProperty({
    description: "Date user trial ends",
    example: Date(),
    required: false,
  })
  @IsDate()
  trialEndDate: Date;


  @ApiProperty({
    description: "Number activities accessible by the user within the current trial plan",
    example: 3,
    required: false,
  })
  @IsNumber()
  trialNumberProgramActivities: number;


  @ApiProperty({
    description: "List features accessible by the user within this plan",
    example: "Can access feature one, Can access feature two, Can access feature three",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  planFeatures: string;
}
