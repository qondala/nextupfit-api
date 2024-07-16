import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateNutritionProgramDto {
  @ApiProperty({
    description: "Titre du programme nutritionnel",
    example: "Programme nutritionnel pour la perte de poids",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: "Description du programme nutritionnel",
    example:
      "Un programme nutritionnel complet pour perdre du poids de manière saine",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
