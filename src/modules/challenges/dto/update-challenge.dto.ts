import { IsOptional, IsString, IsDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateChallengeDto {
  @ApiProperty({
    description: "Description du challenge",
    example: "Faire 3 séances de musculation par semaine pendant un mois",
    required: false,
  })
  @IsOptional()
  @IsString()
  challengeDescription?: string;

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
