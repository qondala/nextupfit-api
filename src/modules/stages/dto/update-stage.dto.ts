import { IsOptional, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateStageDto {
  @ApiProperty({
    description: "Titre de l'étape",
    example: "Introduction à la musculation",
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: "Description de l'étape",
    example:
      "Apprenez les bases de la musculation et les exercices fondamentaux",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: "Ordre d'affichage de l'étape dans le contenu",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  orderIndex?: number;
}
