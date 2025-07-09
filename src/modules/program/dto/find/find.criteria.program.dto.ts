import { ApiProperty } from "@nestjs/swagger";
import {
  IsOptional,
  IsEnum,
} from "class-validator";

import { SwaggerType } from "@app/common/types";

import {
    ProgramStatusEnum,
    ProgramTypeEnum,
} from "../../types";

import { ProgramFindOrderByEnum } from ".";


export class ProgramFindCriteriaDto {

  @ApiProperty({
    name: 'name',
    type: SwaggerType.STRING,
    description: "Program name",
    example: "Daily workout",
    required: false,
  })
  @IsOptional()
  name?: string;

  @ApiProperty({
    name: 'gymId',
    type: SwaggerType.INTEGER,
    description: "Id of the gym promoting the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  gymId?: number;


  @ApiProperty({
    name: 'ownerUserId',
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  ownerUserId?: number;
  
  @ApiProperty({
    name: 'ownerManagerId',
    type: SwaggerType.INTEGER,
    description: "Id of the gym manager owning the program",
    example: 4335,
    required: false,
  })
  @IsOptional()
  ownerManagerId?: number;

  @ApiProperty({
    name: 'type',
    description: "Program type",
    enum: ProgramTypeEnum,
    enumName: "ProgramTypeEnum",
    title: "ProgramTypeEnum",
    example: ProgramTypeEnum.nutrition,
    required: false,
  })
  @IsEnum(ProgramTypeEnum)
  type?: ProgramTypeEnum;


  @ApiProperty({
    name: 'status',
    description: "Program status",
    enum: ProgramStatusEnum,
    enumName: "ProgramStatusEnum",
    title: "ProgramStatusEnum",
    example: ProgramStatusEnum.published,
    required: false,
  })
  @IsEnum(ProgramStatusEnum)
  status?: ProgramStatusEnum;


  @ApiProperty({
    name: 'duration',
    type: SwaggerType.INTEGER,
    description: "Duration of the program",
    example: 2,
    required: false,
    default: 2
  })
  @IsOptional()
  duration?: number;


  @ApiProperty({
    name: 'durationUnitId',
    type: SwaggerType.INTEGER,
    description: "Duration unit",
    example: 16,
    required: false,
    default: 16
  })
  @IsOptional()
  durationUnitId?: number;


  @ApiProperty({
    name: 'difficultyLevel',
    type: SwaggerType.INTEGER,
    description: "Difficulty level on a scale of 10",
    example: 0,
    required: false,
    default: 0
  })
  @IsOptional()
  difficultyLevel?: number;

  @ApiProperty({
    name: 'orderBy',
    enum: ProgramFindOrderByEnum,
    enumName: "ProgramFindOrderByEnum",
    required: false,
  })
  orderBy?: ProgramFindOrderByEnum;
}
