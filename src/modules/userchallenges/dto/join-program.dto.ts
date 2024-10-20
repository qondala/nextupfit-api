import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsDate,
  IsString,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class JoinProgramDto {
  @ApiProperty({ description: "ID du programme d'entraînement", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @ApiProperty({
    description: "Date de début du programme",
    example: "2024-05-20",
    required: false,
  })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    description: "Date de fin du programme",
    example: "2024-06-20",
    required: false,
  })
  @IsOptional()
  @IsDate()
  endDate?: Date;

  @ApiProperty({
    description: "Statut du programme (active, completed, paused)",
    example: "active",
    required: false,
  })
  @IsOptional()
  @IsString()
  programStatus?: "active" | "completed" | "paused";
}
