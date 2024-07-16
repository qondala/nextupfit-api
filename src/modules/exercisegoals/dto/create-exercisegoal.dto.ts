import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExerciseGoalDto {
  @ApiProperty({ description: "ID de l'exercice", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  exerciseId: number;

  @ApiProperty({ description: "ID de l'objectif fitness", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  goalId: number;
}
