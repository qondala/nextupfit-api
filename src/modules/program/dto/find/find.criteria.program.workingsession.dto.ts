import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsEnum,
} from "class-validator";

import { SwaggerType } from "@app/common/types";

import { ProgramStepActivityStatusEnum } from "../../types";
import { ProgramFindOrderWorkingsessionEnum } from ".";


export class ProgramFindCriteriaWorkingsessionDto {

  @ApiProperty({
    name: 'workingSessionId',
    type: SwaggerType.INTEGER,
    description: "Workingsession's id",
    required: false,
  })
  @IsOptional()
  workingSessionId?: number;


  @ApiProperty({
    name: 'baseWorkoutId',
    type: SwaggerType.INTEGER,
    description: "Base workout's id",
    required: false,
  })
  @IsOptional()
  baseWorkoutId?: number;


  @ApiProperty({
    name: 'search',
    type: SwaggerType.STRING,
    description: "Working session's title",
    example: "Simple Pillates workout",
    required: false,
  })
  @IsOptional()
  search?: string;


  @ApiProperty({
    name: 'gymId',
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the Workingession",
    required: false,
  })
  @IsOptional()
  gymId?: number;


  @ApiProperty({
    name: 'programId',
    type: SwaggerType.INTEGER,
    description: "Id of the program",
    required: false,
  })
  @IsOptional()
  programId?: number;

  @ApiProperty({
    name: 'programStepId',
    type: SwaggerType.INTEGER,
    description: "Id of the program step",
    required: false,
  })
  @IsOptional()
  programStepId?: number;


  @ApiProperty({
    name: 'programStepActivityId',
    type: SwaggerType.INTEGER,
    description: "Id of the program step acitivity",
    required: false,
  })
  @IsOptional()
  programStepActivityId?: number;


  @ApiProperty({
    name: 'ownerUserId',
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program workout",
    required: false,
  })
  @IsOptional()
  ownerUserId?: number;
  
  @ApiProperty({
    name: 'ownerManagerId',
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program workout",
    required: false,
  })
  @IsOptional()
  ownerManagerId?: number;


  @ApiProperty({
    name: 'status',
    enum: ProgramStepActivityStatusEnum,
    enumName: "ProgramStepActivityStatusEnum",
    required: false,
  })
  @IsOptional()
  status: ProgramStepActivityStatusEnum;



  @ApiProperty({
    name: 'attendeesCount',
    type: SwaggerType.INTEGER,
    description: "Workingsession attendees count",
    required: false
  })
  @IsOptional()
  attendeesCount?: number;


  @ApiProperty({
    name: 'viewsCount',
    type: SwaggerType.INTEGER,
    description: "Views count",
    required: false
  })
  @IsOptional()
  viewsCount?: number;


  @ApiProperty({
    name: 'ratingsAvg',
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    required: false
  })
  @IsOptional()
  ratingsAvg?: number;


  @ApiProperty({
    name: 'ratingsCount',
    type: SwaggerType.INTEGER,
    description: "Number times Workingsession was rated",
    required: false
  })
  @IsOptional()
  ratingsCount?: number;


  @ApiProperty({
    name: 'difficultyLevel',
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    required: false
  })
  @IsOptional()
  difficultyLevel?: number;


  @ApiProperty({
    name: 'orderBy',
    enum: ProgramFindOrderWorkingsessionEnum,
    enumName: "ProgramFindOrderWorkingsessionEnum",
    required: false,
  })
  @IsOptional()
  orderBy?: ProgramFindOrderWorkingsessionEnum;
}
