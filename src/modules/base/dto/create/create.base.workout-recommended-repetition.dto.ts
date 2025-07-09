
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { BaseWorkoutAttendeeLevelEnum } from "../../types";
import { SwaggerType } from "@app/common/types";


export class CreateBaseWorkoutRecommendedRepetitionDto {

  @ApiProperty({
    enum: BaseWorkoutAttendeeLevelEnum,
    enumName: "BaseWorkoutAttendeeLevelEnum",
    description: "Workout attendee level",
    example: BaseWorkoutAttendeeLevelEnum.beginner,
    required: true
  })
  @IsNotEmpty()
  @IsEnum(BaseWorkoutAttendeeLevelEnum)
  attendeeLevel: BaseWorkoutAttendeeLevelEnum;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Duration expected for this repetition",
    example: 20,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  duration: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Unity id to be use for the duration field; exple: 8 = min.",
    example: 8,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  durationUnitId: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Number repetitions.",
    example: 20,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  setCount: number;


  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workout being configured.",
    example: 13,
    required: true
  })
  @IsNotEmpty()
  @IsInt()
  baseWorkoutId: number;
}
