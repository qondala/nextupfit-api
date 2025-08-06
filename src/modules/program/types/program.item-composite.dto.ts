import { IsDefined, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

import {
  DetailsProgramDto,
  DetailsProgramStepDto,
  DetailsProgramStepActivityDto,
  DetailsProgramStepActivityWorkingsessionDto,
  DetailsProgramStepActivityWorkingsessionWorkoutDto,
  DetailsProgramStepActivityWorkingsessionPracticeDto,
} from "../dto";

export class ProgramItemCompositeDto {
  @ApiProperty({
    type: () => DetailsProgramDto,
    title: "DetailsProgramDto",
    description: "Program details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsProgramDto)
  program?: DetailsProgramDto;

  @ApiProperty({
    type: () => DetailsProgramStepDto,
    title: "DetailsProgramStepDto",
    description: "Program step details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsProgramStepDto)
  step?: DetailsProgramStepDto;

  @ApiProperty({
    type: () => DetailsProgramStepActivityDto,
    title: "DetailsProgramStepActivityDto",
    description: "Program step activity details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsProgramStepActivityDto)
  activity?: DetailsProgramStepActivityDto;

  @ApiProperty({
    type: () => DetailsProgramStepActivityWorkingsessionDto,
    title: "DetailsProgramStepActivityWorkingsessionDto",
    description: "Program step activity workingsession details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsProgramStepActivityWorkingsessionDto)
  workingsession?: DetailsProgramStepActivityWorkingsessionDto;

  @ApiProperty({
    type: () => DetailsProgramStepActivityWorkingsessionWorkoutDto,
    title: "DetailsProgramStepActivityWorkingsessionWorkoutDto",
    description: "Program step activity workingsession workout details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsProgramStepActivityWorkingsessionWorkoutDto)
  workout?: DetailsProgramStepActivityWorkingsessionWorkoutDto;

  @ApiProperty({
    type: () => DetailsProgramStepActivityWorkingsessionPracticeDto,
    title: "DetailsProgramStepActivityWorkingsessionPracticeDto",
    description: "Program step activity workingsession practice details",
    required: true,
  })
  @IsDefined()
  @ValidateNested()
  @Type(() => DetailsProgramStepActivityWorkingsessionPracticeDto)
  practice?: DetailsProgramStepActivityWorkingsessionPracticeDto;

  constructor() {
    this.program = null;
    this.step = null;
    this.activity = null;
    this.workingsession = null;
    this.workout = null;
    this.practice = null;
  }
}
