import { IsOptional, IsString, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateGoalDto {
  @ApiProperty({
    description: "Description de l'objectif fitness",
    example: "Perdre 5 kg de graisse corporelle",
    required: false,
  })
  @IsOptional()
  @IsString()
  goalDescription?: string;

  @ApiProperty({
    description: "Date cible pour atteindre l'objectif",
    example: "2024-06-30",
    required: false,
  })
  @IsOptional()
  @IsDate()
  targetDate?: Date;

  @ApiProperty({
    description: "Statut de l'objectif (active, completed, failed)",
    example: "active",
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: "active" | "completed" | "failed";
}
