import { IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateExerciseGoalDto {
  @ApiProperty({ description: "ID de l'exercice", example: 1, required: false })
  @IsOptional()
  @IsNumber()
  exerciseId?: number;

  @ApiProperty({
    description: "ID de l'objectif fitness",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  goalId?: number;
}
