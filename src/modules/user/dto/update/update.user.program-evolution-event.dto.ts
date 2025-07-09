import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsInt
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import {
  ProgramEvolutionEventTypeEnum,
  ProgramItemTypeEnum
} from "@app/module/program/types";

import { SwaggerType } from "@app/common/types";

export class UpdateUserProgramEvolutionDto {

  @ApiProperty({
    enum: ProgramEvolutionEventTypeEnum,
    enumName: "ProgramEvolutionEventTypeEnum",
    isArray: true,
    description: "For saving any program evolution of the user",
    example: ProgramEvolutionEventTypeEnum.registered,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramEvolutionEventTypeEnum)
  event?: ProgramEvolutionEventTypeEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "User id",
    example: 12345,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  userId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Gym owning the program",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  gymId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Concerned program",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  programItemId?: number;


  @ApiProperty({
    enum: ProgramItemTypeEnum,
    enumName: "ProgramItemTypeEnum",
    isArray: true,
    description: "Program component concerned by the evolution",
    example: ProgramItemTypeEnum.workout,
    required: false,
  })
  @IsOptional()
  @IsEnum(ProgramItemTypeEnum)
  programItem?: ProgramItemTypeEnum;


  @ApiProperty({
    type: SwaggerType.STRING,
    format: "date-time",
    description: "Date of subscription",
    example: Date(),
    required: false,
  })
  @IsOptional()
  @IsDate()
  subscriptionDate?: Date;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Quantity",
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  quantity?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Iteration: for programs that extends over multiple days or another time unit, this field represents the nth day the user attents to the program component.",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  iteration?: number;
}

