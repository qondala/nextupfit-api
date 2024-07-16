import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNutritionDetailDto {
  @ApiProperty({ description: "ID du programme nutritionnel", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  nutritionProgramId: number;

  @ApiProperty({ description: "Type de repas", example: "breakfast" })
  @IsNotEmpty()
  @IsString()
  mealType: "breakfast" | "lunch" | "dinner" | "snack";

  @ApiProperty({
    description: "Ingrédients du repas",
    example: "Avoine, fruits, lait",
  })
  @IsNotEmpty()
  @IsString()
  ingredients: string;

  @ApiProperty({
    description: "Instructions de préparation",
    example: "Faire chauffer l'avoine avec du lait, ajouter les fruits",
    required: false,
  })
  @IsOptional()
  @IsString()
  preparation?: string;

  @ApiProperty({
    description: "Calories du repas",
    example: 300,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  calories?: number;

  @ApiProperty({
    description: "Protéines du repas (en grammes)",
    example: 15,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  proteins?: number;

  @ApiProperty({
    description: "Glucides du repas (en grammes)",
    example: 50,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  carbs?: number;

  @ApiProperty({
    description: "Lipides du repas (en grammes)",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  fats?: number;
}
