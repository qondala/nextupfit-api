import {
  IsNumber,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsInt,
  IsDate
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";


export class CreateProgramSubscriptionPlanDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Program subscription plan",
    example:"Starter",
    required: true,
  })
  @IsString()
  planName: string;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Plan price",
    example: 99.99,
    required: true,
  })
  @IsNumber()
  price: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Trial plan number days",
    example: 10,
    required: false,
  })
  @IsNumber()
  trialNumberDays?: number;


  @ApiProperty({
    enum: BaseSubscriptionPlanPeriodicityEnum,
    enumName: "BaseSubscriptionPlanPeriodicityEnum",
    description: "Subscription plan periodicity",
    example: BaseSubscriptionPlanPeriodicityEnum.monthly,
    required: false,
  })
  @IsEnum(BaseSubscriptionPlanPeriodicityEnum)
  periodity: BaseSubscriptionPlanPeriodicityEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Subscription plan description",
    example: "This plan allows you to start with the mimimum budget and upgrade later",
    required: false,
  })
  @IsString()
  description: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number activities accessible by the user within the current trial plan",
    example: 3,
    required: false,
  })
  @IsNumber()
  trialNumberProgramActivities?: number;


  @ApiProperty({
    description: "Program id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  programId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Content id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentId: number;
}
