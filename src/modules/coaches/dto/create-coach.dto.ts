import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateCoachDto {
  @ApiProperty({
    description: "Specialite du coach",
    example: "Coach specialise en musculation et fitness",
  })
  @IsString()
  @IsNotEmpty()
  speciality: string;

  @ApiProperty({
    description: "Description du coach",
    example: "Coach certifié en musculation et fitness",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: "Site Web du coach" })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ description: "Lien instagram du Coach" })
  @IsString()
  @IsOptional()
  instagram?: string;

  @ApiProperty({ description: "Lien vers la page facebook du coach" })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiProperty({ description: "Lien vers la chaine YouTube du Coach" })
  @IsString()
  @IsOptional()
  youtube?: string;

  @ApiProperty({ description: "Lien vers le twitter du Coach" })
  @IsString()
  @IsOptional()
  twitter?: string;

  @IsOptional()
  userId: number;

  @ApiProperty({
    description: "Biographie du coach",
    example: "Coach certifié en musculation et fitness",
    required: false,
  })
  @IsOptional()
  bio: string;

  @ApiProperty({
    description: "Note moyenne du coach (0-5)",
    example: 4.5,
    required: false,
  })
  @IsOptional()
  @IsString()
  ratingAvg?: number;
}
