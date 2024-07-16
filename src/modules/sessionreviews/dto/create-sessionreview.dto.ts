import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSessionReviewDto {
  @ApiProperty({ description: "ID de la session d'entraînement", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  sessionId: number;

  @ApiProperty({
    description: "Note de la session d'entraînement (1-5)",
    example: 4,
  })
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @ApiProperty({
    description: "Commentaire sur la session d'entraînement",
    example: "Une session très énergisante et instructive",
    required: false,
  })
  @IsOptional()
  @IsString()
  reviewText?: string;
}
