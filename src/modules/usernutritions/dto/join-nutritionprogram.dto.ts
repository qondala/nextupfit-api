import { IsNotEmpty, IsNumber, IsOptional, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class JoinNutritionProgramDto {
  @ApiProperty({ description: "ID du programme nutritionnel", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  nutritionProgramId: number;

  @ApiProperty({
    description: "Date de début du programme",
    example: "2024-05-20",
    required: false,
  })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    description: "Pourcentage d'adhésion au programme",
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  adherencePercentage?: number;
}
