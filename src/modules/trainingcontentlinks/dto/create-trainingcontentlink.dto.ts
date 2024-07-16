import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTrainingContentLinkDto {
  @ApiProperty({ description: "ID de la session d'entraînement", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  sessionId: number;

  @ApiProperty({ description: "ID du contenu à associer", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;
}
