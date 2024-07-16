import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTrainingSessionDto {
  @ApiProperty({ description: "ID de la session d'entraînement", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  sessionId: number;

  @ApiProperty({
    description: "Indique si l'utilisateur a assisté à la session",
    example: true,
  })
  @IsNotEmpty()
  @IsNumber()
  attended: boolean;
}
