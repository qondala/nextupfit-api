import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNutritionProgramReviewDto {
  @ApiProperty({ description: "ID du programme nutritionnel", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  nutritionProgramId: number;

  @ApiProperty({
    description: "Note du programme nutritionnel (1-5)",
    example: 4,
  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: "Commentaire sur le programme nutritionnel",
    example: "Un programme très efficace et facile à suivre",
    required: false,
  })
  @IsOptional()
  @IsString()
  reviewText?: string;
}
