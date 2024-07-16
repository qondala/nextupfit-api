import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateExerciseNutritionDto {
  @ApiProperty({ description: "ID de l'exercice", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  exerciseId: number;

  @ApiProperty({ description: "ID du programme nutritionnel", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  nutritionProgramId: number;
}
