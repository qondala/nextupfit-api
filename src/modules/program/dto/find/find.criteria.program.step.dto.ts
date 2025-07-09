import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { ProgramStepStatusEnum } from "../../types";
import { ProgramFindOrderStepEnum } from ".";


export class ProgramFindCriteriaStepDto {

  @ApiProperty({
    name: "search",
    type: SwaggerType.STRING,
    description: "Search string",
    required: false,
  })
  search?: string;

  @ApiProperty({
    name: "gymId",
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the program",
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
    name: "ownerUserId",
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program",
    required: false,
  })
  ownerUserId?: number;

  @ApiProperty({
    name: "ownerManagerId",
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program",
    required: false,
  })
  ownerManagerId?: number;


  @ApiProperty({
    name: "status",
    enum: ProgramStepStatusEnum,
    enumName: "ProgramStepStatusEnum",
    title: "ProgramStepStatusEnum",
    description: "Program step status",
    required: false,
  })
  status?: ProgramStepStatusEnum;


  @ApiProperty({
    name: "attendeesCount",
    type: SwaggerType.INTEGER,
    description: "Step attendees count",
    required: false,
    default: 0
  })
  attendeesCount?: number;


  @ApiProperty({
    name: "viewsCount",
    type: SwaggerType.INTEGER,
    description: "Views count",
    required: false,
    default: 0
  })
  viewsCount?: number;


  @ApiProperty({
    name: "ratingsAvg",
    type: SwaggerType.NUMBER,
    description: "Ratings average",
    required: false,
    default: 0
  })
  ratingsAvg?: number;


  @ApiProperty({
    name: "ratingsCount",
    type: SwaggerType.INTEGER,
    description: "Number times step was rated",
    required: false,
    default: 0
  })
  ratingsCount?: number;


  @ApiProperty({
    name: "duration",
    type: SwaggerType.INTEGER,
    description: "Duration of the step",
    required: false,
    default: 2
  })
  duration?: number;

  
  @ApiProperty({
    name: "difficultyLevel",
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    required: false,
  })
  difficultyLevel?: number;

  @ApiProperty({
    name: "orderBy",
    enum: ProgramFindOrderStepEnum,
    enumName: "ProgramFindOrderStepEnum",
    title: "ProgramFindOrderStepEnum",
    description: "Program step order",
    required: false,
  })
  orderBy?: ProgramFindOrderStepEnum;
}
