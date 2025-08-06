import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";

import { ProgramFindOrderPracticeEnum } from ".";

export class ProgramFindCriteriaPracticeDto {
  @ApiProperty({
    name: "gymId",
    type: SwaggerType.INTEGER,
    description: "Id of the gym",
    required: false,
  })
  gymId?: number;

  @ApiProperty({
    name: "programId",
    type: SwaggerType.INTEGER,
    description: "Id of the program",
    required: false,
  })
  programId?: number;

  @ApiProperty({
    name: "programStepId",
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    required: false,
  })
  programStepId?: number;

  @ApiProperty({
    name: "programStepActivityId",
    type: SwaggerType.INTEGER,
    description: "Id of the program step activity",
    required: false,
  })
  programStepActivityId?: number;

  @ApiProperty({
    name: "ownerUserId",
    type: SwaggerType.INTEGER,
    description: "Id of the user owning the practice",
    required: false,
  })
  ownerUserId?: number;

  @ApiProperty({
    name: "ownerManagerId",
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the practice",
    required: false,
  })
  ownerManagerId?: number;

  @ApiProperty({
    name: "workingSessionId",
    type: SwaggerType.INTEGER,
    description: "Id of the working session",
    required: false,
  })
  workingSessionId?: number;

  @ApiProperty({
    name: "programWorkoutId",
    type: SwaggerType.INTEGER,
    description: "Id of the program workout",
    required: false,
  })
  programWorkoutId?: number;

  @ApiProperty({
    name: "programNutritionId",
    type: SwaggerType.INTEGER,
    description: "Id of the program nutrition",
    required: false,
  })
  programNutritionId?: number;

  @ApiProperty({
    name: "orderBy",
    enum: ProgramFindOrderPracticeEnum,
    enumName: "ProgramFindOrderPracticeEnum",
    required: false,
  })
  @IsOptional()
  orderBy?: ProgramFindOrderPracticeEnum;
}
