import { IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateExerciseNutritionDto {
  @ApiProperty({ description: "ID de l'exercice", example: 1, required: false })
  @IsOptional()
  @IsNumber()
  exerciseId?: number;

  @ApiProperty({
    description: "ID du programme nutritionnel",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  nutritionProgramId?: number;
}
