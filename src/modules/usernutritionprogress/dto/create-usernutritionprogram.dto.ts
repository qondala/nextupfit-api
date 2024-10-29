import { IsNotEmpty, IsNumber, IsDate, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserNutritionProgressDto {
  @ApiProperty({ description: "ID du programme nutritionnel", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  nutritionProgramId: number;

  @ApiProperty({
    description: "Date de la progression nutritionnelle",
    example: "2024-05-20",
  })
  @IsNotEmpty()
  @IsDate()
  dateLogged: Date;

  @ApiProperty({
    description: "Apport calorique total",
    example: 2000,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  caloriesIntake?: number;

  @ApiProperty({
    description: "Apport protéique total (en grammes)",
    example: 100,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  proteinIntake?: number;

  @ApiProperty({
    description: "Apport en glucides total (en grammes)",
    example: 200,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  carbsIntake?: number;

  @ApiProperty({
    description: "Apport en lipides total (en grammes)",
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  fatsIntake?: number;

  @ApiProperty({
    description: "Score d'adhésion au programme",
    example: 80,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  adherenceScore?: number;

  @ApiProperty({
    description: "Type de repas",
    example: "breakfast",
    required: false,
  })
  @IsOptional()
  mealType: "breakfast" | "lunch" | "dinner" | "snack";

  @ApiProperty({
    description: "Aliments consommés",
    example: "Eggs",
    required: false,
  })
  @IsOptional()
  mealsConsumed: any;
}
