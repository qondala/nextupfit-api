import { IsNotEmpty, IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { SwaggerType } from "@app/common/types";

export class CreateBaseWorkoutMuscleDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workout ID",
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  workoutId: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Muscle ID",
    example: 5,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  muscleId: number;
}
