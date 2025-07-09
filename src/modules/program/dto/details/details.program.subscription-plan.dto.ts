
import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsDate,
  IsString,
  IsEnum,
  IsNotEmpty,
  IsDefined,
  ValidateNested
} from "class-validator";
import { Type } from "class-transformer";

import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";
import { DetailsContentDto } from "@app/module/content/dto";


export class DetailsProgramSubscriptionPlanDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    example: 1234,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  id: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Program subscription plan",
    example:"Starter",
    required: true,
  })
  @IsInt()
  planName: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Plan price",
    example: Date(),
    required: true,
  })
  @IsInt()
  price: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Trial plan number days",
    example: 10,
    required: false,
  })
  @IsInt()
  trialNumberDays: number;


  @ApiProperty({
    enum: BaseSubscriptionPlanPeriodicityEnum,
    enumName: "BaseSubscriptionPlanPeriodicityEnum",
    title: "BaseSubscriptionPlanPeriodicityEnum",
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
    type: SwaggerType.DATE,
    description: "Date user trial ends",
    example: Date(),
    required: false,
  })
  @IsDate()
  trialEndDate: Date;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number activities accessible by the user within the current trial plan",
    example: 3,
    required: false,
  })
  @IsInt()
  trialNumberProgramActivities: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
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

  @ApiProperty({
    type: () => DetailsContentDto,
    title: "DetailsContentDto",
    description: "Content details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsContentDto)
  content: DetailsContentDto;
}
