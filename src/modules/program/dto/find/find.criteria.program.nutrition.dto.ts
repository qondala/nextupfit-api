import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

import { SwaggerType } from "@app/common/types";

import { ProgramFindOrderNutritionEnum } from ".";

export class ProgramFindCriteriaNutritionDto {
  @ApiProperty({
    name: "title",
    type: SwaggerType.STRING,
    description: "Nutrition's title",
    required: false,
  })
  @IsOptional()
  title?: string;

  @ApiProperty({
    name: "baseNutritionId",
    type: SwaggerType.INTEGER,
    description: "Base nutrition's id",
    example: 12,
    required: false,
  })
  baseNutritionId?: number;

  @ApiProperty({
    name: "gymId",
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the nutrition",
    example: 4335,
    required: true,
  })
  gymId: number;

  @ApiProperty({
    name: "programStepId",
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    example: 789,
    required: true,
  })
  programStepId: number;

  @ApiProperty({
    name: "programStepActivityId",
    type: SwaggerType.INTEGER,
    description: "Id of the program step activity",
    example: 45645,
    required: true,
  })
  programStepActivityId: number;

  @ApiProperty({
    name: "ownerUserId",
    type: SwaggerType.INTEGER,
    description: "Id of the user owning the program nutrition",
    example: 4335,
    required: true,
  })
  ownerUserId: number;

  @ApiProperty({
    name: "ownerManagerId",
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program nutrition",
    example: 4335,
    required: true,
  })
  ownerManagerId: number;

  @ApiProperty({
    name: "programSessionPracticeId",
    type: SwaggerType.INTEGER,
    description: "Program session practice ID",
    required: false,
  })
  programSessionPracticeId?: number;

  @ApiProperty({
    name: "difficultyLevel",
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    required: false,
  })
  @IsOptional()
  difficultyLevel?: number;

  @ApiProperty({
    name: "orderBy",
    enum: ProgramFindOrderNutritionEnum,
    enumName: "ProgramFindOrderNutritionEnum",
    required: false,
  })
  @IsOptional()
  orderBy?: ProgramFindOrderNutritionEnum;
}
