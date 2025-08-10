import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsInt } from "class-validator";
import { SwaggerType } from "@app/common/types";

export class UpdateBaseWorkoutMuscleDto {
  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Workout ID",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  workoutId?: number;

  @ApiProperty({
    type: SwaggerType.INTEGER,
    description: "Muscle ID",
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  muscleId?: number;
}
