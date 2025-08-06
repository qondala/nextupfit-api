import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEnum, IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";

import { BaseSubscriptionPlanPeriodicityEnum } from "@app/module/base/types";

import { ProgramFindSubscriptionPlanOrderByEnum } from ".";

export class ProgramFindCriteriaSubscriptionPlanDto {
  @ApiProperty({
    name: "planName",
    type: SwaggerType.STRING,
    description: "Program subscription plan",
    example: "Starter",
    required: false,
  })
  @IsOptional()
  planName?: string;

  @ApiProperty({
    name: "priceHigherThan",
    type: SwaggerType.NUMBER,
    description: "Plan price",
    required: false,
  })
  @IsOptional()
  priceHigherThan?: number;

  @ApiProperty({
    name: "priceLessThan",
    type: SwaggerType.NUMBER,
    description: "Plan price",
    required: false,
  })
  @IsOptional()
  priceLessThan?: number;

  @ApiProperty({
    name: "periodicity",
    enum: BaseSubscriptionPlanPeriodicityEnum,
    enumName: "BaseSubscriptionPlanPeriodicityEnum",
    description: "Subscription plan periodicity",
    example: BaseSubscriptionPlanPeriodicityEnum.monthly,
    required: false,
  })
  @IsEnum(BaseSubscriptionPlanPeriodicityEnum)
  periodicity?: BaseSubscriptionPlanPeriodicityEnum;

  @ApiProperty({
    name: "description",
    type: SwaggerType.STRING,
    description: "Subscription plan description",
    example:
      "This plan allows you to start with the mimimum budget and upgrade later",
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    name: "programId",
    type: SwaggerType.INTEGER,
    description: "Program id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  programId?: number;

  @ApiProperty({
    name: "contentId",
    type: SwaggerType.INTEGER,
    description: "Content id",
    example: 1234,
    required: false,
  })
  @IsOptional()
  contentId?: number;

  @ApiProperty({
    name: "active",
    type: SwaggerType.BOOLEAN,
    description: "Subscription plan active",
    example: true,
    required: false,
  })
  @IsOptional()
  active?: boolean;

  @ApiProperty({
    name: "orderBy",
    enum: ProgramFindSubscriptionPlanOrderByEnum,
    enumName: "ProgramFindSubscriptionPlanOrderByEnum",
    description: "Subscription plan order by",
    required: false,
  })
  @IsOptional()
  orderBy?: ProgramFindSubscriptionPlanOrderByEnum;
}
