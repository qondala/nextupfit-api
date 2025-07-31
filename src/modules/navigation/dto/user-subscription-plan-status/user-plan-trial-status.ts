import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";
import { TrialPlanItemType } from "../../types";


export class UserPlanTrialStatus {

  @ApiProperty({
    enum: TrialPlanItemType,
    enumName: "TrialPlanItemType",
    description: "Trial type",
    required: true,
    default: TrialPlanItemType.gym,
  })
  trialType: TrialPlanItemType;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Trial plan id",
    required: true,
  })
  planId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number of trial days of plan",
    required: true,
  })
  numberTrialDaysOfPlan: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number of trial days left",
    required: true,
  })
  numberOfDaysLeft: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number of trial activities of plan",
    required: true,
  })
  numberTrialActivitiesOfPlan: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number of trial activities left",
    required: true,
  })
  numberOfActivitiesLeft: number;
}
