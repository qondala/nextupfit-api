import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsEnum,
} from "class-validator";

import { SwaggerType } from "@app/common/types";

import { ProgramStepActivityStatusEnum } from "../../types";
import { ProgramFindOrderActivityEnum } from ".";


export class ProgramFindCriteriaActivityDto {

  @ApiProperty({
    name: 'search',
    type: SwaggerType.STRING,
    description: "Activity's title",
    example: "Simple Pillates workout",
    required: false,
  })
  @IsOptional()
  search?: string;


  @ApiProperty({
    name: 'gymId',
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the activity",
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
    name: 'ownerUserId',
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program activity",
    required: false,
  })
  @IsOptional()
  ownerUserId?: number;
  
  @ApiProperty({
    name: 'ownerManagerId',
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program activity",
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
    description: "Activity attendees count",
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
    description: "Number times Activity was rated",
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
    name: 'priceHigherThan',
    type: SwaggerType.INTEGER,
    description: "Price higher than",
    required: false
  })
  @IsOptional()
  priceHigherThan?: number;

  @ApiProperty({
    name: 'priceLowerThan',
    type: SwaggerType.INTEGER,
    description: "Price lower than",
    required: false
  })
  @IsOptional()
  priceLowerThan?: number;

  @ApiProperty({
    name: 'isChallenge',
    type: SwaggerType.BOOLEAN,
    description: "Is challenge",
    required: false
  })
  @IsOptional()
  isChallenge?: boolean;

  @ApiProperty({
    name: 'isFreeTool',
    type: SwaggerType.BOOLEAN,
    description: "Is free tool",
    required: false
  })
  @IsOptional()
  isFreeTool?: boolean;

  @ApiProperty({
    name: 'orderBy',
    enum: ProgramFindOrderActivityEnum,
    enumName: "ProgramFindOrderActivityEnum",
    required: false,
  })
  @IsOptional()
  orderBy?: ProgramFindOrderActivityEnum;
}
