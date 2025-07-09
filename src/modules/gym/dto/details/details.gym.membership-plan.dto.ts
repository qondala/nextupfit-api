
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDefined, IsInt, IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";
import { SwaggerType } from "@app/common/types";

import { DetailsGymDto } from ".";
import { DetailsContentDto } from "@app/module/content/dto";

export class DetailsGymMembershipPlanDto {

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "record id",
    required: true,
  })
  id: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym id",
    required: true,
  })
  gymId: number;


  @ApiProperty({
    type: SwaggerType.STRING,
    description: "Plan name",
    required: true,
  })
  planName: string;


  @ApiProperty({
    type: SwaggerType.NUMBER,
    description: "Price",
    required: true,
  })
  price: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
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
    type: SwaggerType.STRING,
    description: "Description",
    required: true,
  })
  description: string;


  @ApiProperty({
    type: SwaggerType.INTEGER,
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
    type: SwaggerType.INTEGER,
    description: "Content id",
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  contentId: number;

  @ApiProperty({
    type: () => DetailsContentDto,
    description: "Content details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsContentDto)
  content: DetailsContentDto;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Created at",
    example: new Date(),
    required: false,
  })
  createdAt?: Date;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: "Updated at",
    example: new Date(),
    required: false,
  })
  updatedAt?: Date;
}
