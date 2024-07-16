import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNutritionProgramDto {
  @ApiProperty({
    description: "Titre du programme nutritionnel",
    example: "Programme nutritionnel pour la perte de poids",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: "Description du programme nutritionnel",
    example:
      "Un programme nutritionnel complet pour perdre du poids de manière saine",
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
