import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateChallengeDto {
  @ApiProperty({
    description: "ID du contenu auquel le challenge est associé",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @ApiProperty({
    description: "Description du challenge",
    example: "Faire 3 séances de musculation par semaine pendant un mois",
  })
  @IsNotEmpty()
  @IsString()
  challengeDescription: string;

  @ApiProperty({
    description: "Date de début du challenge",
    example: "2024-05-20",
    required: false,
  })
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @ApiProperty({
    description: "Date de fin du challenge",
    example: "2024-06-20",
    required: false,
  })
  @IsOptional()
  @IsDate()
  endDate?: Date;
}
