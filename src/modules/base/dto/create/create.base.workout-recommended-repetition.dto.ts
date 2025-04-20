
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseWorkoutAttendeeLevelEnum } from "../../types";


export class CreateBaseWorkoutRecommendedRepetitionDto {

  @ApiProperty({
    description: "Workout attendee level",
    example: BaseWorkoutAttendeeLevelEnum.beginner,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(BaseWorkoutAttendeeLevelEnum)
  attendeeLevel: BaseWorkoutAttendeeLevelEnum;


  @ApiProperty({
    description: "Duration expected for this repetition",
    example: 20,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;


  @ApiProperty({
    description: "Unity id to be use for the duration field; exple: 8 = min.",
    example: 8,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  durationUnitId: number;


  @ApiProperty({
    description: "Number repetitions.",
    example: 20,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  setCount: number;


  @ApiProperty({
    description: "Workout being configured.",
    example: 13,
    required: true
  })
  @IsNotEmpty()
  @IsNumber()
  baseWorkoutId: number;
}
  