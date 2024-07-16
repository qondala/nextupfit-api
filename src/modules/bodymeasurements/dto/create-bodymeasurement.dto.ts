import { IsNotEmpty, IsNumber, IsOptional, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBodyMeasurementDto {
  @ApiProperty({
    description: "Date de la mesure corporelle",
    example: "2024-05-20",
  })
  @IsNotEmpty()
  @IsDate()
  dateRecorded: Date;

  @ApiProperty({ description: "Poids", example: 80, required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ description: "Taille", example: 1.8, required: false })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({
    description: "Pourcentage de graisse corporelle",
    example: 15,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  bodyFatPercentage?: number;

  @ApiProperty({
    description: "Masse musculaire",
    example: 65,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  muscleMass?: number;
}
