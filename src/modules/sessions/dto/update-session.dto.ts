import { IsOptional, IsString, IsNumber, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSessionDto {
  @ApiProperty({
    description: "Date et heure de la session",
    example: "2024-05-20T18:00:00",
    required: false,
  })
  @IsOptional()
  @IsDate()
  sessionTime?: Date;

  @ApiProperty({
    description: "Lieu de la session (pour les sessions en direct)",
    example: "Salle de sport",
    required: false,
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({
    description: "Nombre maximal de participants (pour les sessions en direct)",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  maxParticipants?: number;
}
