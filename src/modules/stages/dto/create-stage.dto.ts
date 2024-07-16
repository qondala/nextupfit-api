import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStageDto {
  @ApiProperty({
    description: "ID du contenu auquel l'étape est associée",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @ApiProperty({
    description: "Titre de l'étape",
    example: "Introduction à la musculation",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

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
