import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateContentNutritionDto {
  @ApiProperty({ description: "ID du contenu", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @ApiProperty({ description: "ID du programme nutritionnel", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  nutritionProgramId: number;
}
