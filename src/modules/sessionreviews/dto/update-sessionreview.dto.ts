import { IsOptional, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSessionReviewDto {
  @ApiProperty({
    description: "Note de la session d'entraînement (1-5)",
    example: 4,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({
    description: "Commentaire sur la session d'entraînement",
    example: "Une session très énergisante et instructive",
    required: false,
  })
  @IsOptional()
  @IsString()
  reviewText?: string;
}
