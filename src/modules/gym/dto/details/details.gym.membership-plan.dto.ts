
import { ApiProperty } from "@nestjs/swagger";
import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";

import { DetailsGymDto, DetailsGymMembershipPlanFeaturesDto } from ".";
import { IsArray, IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";



export class DetailsGymMembershipPlanDto {

  @ApiProperty({
    type: Number,
    description: "record id",
    required: true,
  })
  id: number;


  @ApiProperty({
    type: Number,
    description: "Gym id",
    required: true,
  })
  gymId: number;


  @ApiProperty({
    type: String,
    description: "Plan name",
    required: true,
  })
  planName: string;


  @ApiProperty({
    type: Number,
    description: "Price",
    required: true,
  })
  price: number;


  @ApiProperty({
    type: Number,
    description: "Trial number days",
    required: false,
  })
  trialNumberDays?: number;


  @ApiProperty({
    enum: BaseSubscriptionPlanPeriodicityEnum,
    description: "Periodity",
    required: true,
  })
  periodicity: BaseSubscriptionPlanPeriodicityEnum;


  @ApiProperty({
    type: String,
    description: "Description",
    required: true,
  })
  description: string;


  @ApiProperty({
    type: Number,
    description: "Trial number program activities",
    required: true,
  })
  trialNumberProgramActivities: number;


  @ApiProperty({
    type: () => DetailsGymDto,
    description: "Gym details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsGymDto)
  gym: DetailsGymDto;


  @ApiProperty({
    type: () => DetailsGymMembershipPlanFeaturesDto,
    isArray: true,
    description: "Features",
    required: true,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DetailsGymMembershipPlanFeaturesDto)
  features: DetailsGymMembershipPlanFeaturesDto[];


  @ApiProperty({
    type: Date,
    description: "Created at",
    example: new Date(),
    required: false,
  })
  createdAt?: Date;


  @ApiProperty({
    type: Date,
    description: "Updated at",
    example: new Date(),
    required: false,
  })
  updatedAt?: Date;

}
