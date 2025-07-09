
import { IsEnum, IsInt, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

import { BaseWorkoutAttendeeLevelEnum } from "../../types";

export class UpdateBaseWorkoutRecommendedRepetitionDto {

  @ApiProperty({
    enum: BaseWorkoutAttendeeLevelEnum,
    enumName: "BaseWorkoutAttendeeLevelEnum",
    description: "Workout attendee level",
    example: BaseWorkoutAttendeeLevelEnum.beginner,
    required: false
  })
  @IsOptional()
  @IsEnum(BaseWorkoutAttendeeLevelEnum)
  attendeeLevel?: BaseWorkoutAttendeeLevelEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration expected for this repetition",
    example: 20,
    required: false
  })
  @IsOptional()
  @IsInt()
  duration?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unity id to be use for the duration field; exple: 8 = min.",
    example: 8,
    required: false
  })
  @IsOptional()
  @IsInt()
  durationUnitId?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number repetitions.",
    example: 20,
    required: false
  })
  @IsOptional()
  @IsInt()
  setCount?: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workout being configured.",
    example: 13,
    required: false
  })
  @IsOptional()
  @IsInt()
  baseWorkoutId?: number;
}
