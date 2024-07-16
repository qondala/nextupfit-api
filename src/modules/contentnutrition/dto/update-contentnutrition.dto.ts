import { IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateContentNutritionDto {
  @ApiProperty({ description: "ID du contenu", example: 1, required: false })
  @IsOptional()
  @IsNumber()
  contentId?: number;

  @ApiProperty({
    description: "ID du programme nutritionnel",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  nutritionProgramId?: number;
}
