import {
  IsNumber,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsInt
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";


export class UpdateProgramSubscriptionPlanDto {

  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program subscription plan",
    example:"Starter",
    required: false,
  })
  @IsString()
  planName?: string;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Plan price",
    example: 99.99,
    required: false,
  })
  @IsNumber()
  price?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Trial plan number days",
    example: 10,
    required: false,
  })
  @IsInt()
  trialNumberDays?: number;


  @ApiProperty({
    enum: BaseSubscriptionPlanPeriodicityEnum,
    enumName: "BaseSubscriptionPlanPeriodicityEnum",
    title: "BaseSubscriptionPlanPeriodicityEnum",
    description: "Subscription plan periodicity",
    example: BaseSubscriptionPlanPeriodicityEnum.monthly,
    required: false,
  })
  @IsEnum(BaseSubscriptionPlanPeriodicityEnum)
  periodity?: BaseSubscriptionPlanPeriodicityEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Subscription plan description",
    example: "This plan allows you to start with the mimimum budget and upgrade later",
    required: false,
  })
  @IsString()
  description?: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number activities accessible by the user within the current trial plan",
    example: 3,
    required: false,
  })
  @IsInt()
  trialNumberProgramActivities?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Subcription plan content",
    example: 10,
    required: false,
  })
  @IsInt()
  contentId?: number;
}

