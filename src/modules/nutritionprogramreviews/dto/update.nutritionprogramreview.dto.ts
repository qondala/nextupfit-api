import { IsOptional, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateNutritionProgramReviewDto {
  @ApiProperty({
    description: "Note du programme nutritionnel (1-5)",
    example: 4,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({
    description: "Commentaire sur le programme nutritionnel",
    example: "Un programme très efficace et facile à suivre",
    required: false,
  })
  @IsOptional()
  @IsString()
  reviewText?: string;
}
