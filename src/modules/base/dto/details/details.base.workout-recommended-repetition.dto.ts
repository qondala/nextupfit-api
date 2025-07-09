import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt } from "class-validator";
import { SwaggerType } from "@app/common/types";
import { BaseWorkoutAttendeeLevelEnum } from "../../types";

export class DetailsBaseWorkoutRecommendedRepetitionDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Identifier',
    example: 1
  })
  @IsInt()
  id: number;

  @ApiProperty({
    enum: BaseWorkoutAttendeeLevelEnum,
    enumName: "BaseWorkoutAttendeeLevelEnum",
    description: 'Attendee level',
    example: BaseWorkoutAttendeeLevelEnum.beginner
  })
  @IsEnum(BaseWorkoutAttendeeLevelEnum)
  attendeeLevel: BaseWorkoutAttendeeLevelEnum;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Duration value',
    example: 30
  })
  @IsInt()
  duration: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Duration unit identifier',
    example: 2
  })
  @IsInt()
  durationUnitId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Set count',
    example: 4
  })
  @IsInt()
  setCount: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: 'Related workout ID',
    example: 10
  })
  @IsInt()
  baseWorkoutId: number;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Creation timestamp'
  })
  createdAt: Date;

  @ApiProperty({
    type: SwaggerType.STRING,
    format: 'date-time',
    description: 'Last update timestamp'
  })
  updatedAt: Date;
}
