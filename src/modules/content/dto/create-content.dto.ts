import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateContentDto {
  @ApiProperty({
    description: "Type de contenu",
    example: "Video, Article, Document",
    required: true,
  })
  @IsString()
  @IsOptional()
  contentType: string;

  @ApiProperty({
    description: "Titre du contenu",
    example: "Programme de musculation pour débutants",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: "Description du contenu",
    example:
      "Un programme complet pour les débutants en musculation, avec des exercices et des conseils",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: "Prix du contenu", example: 20, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({
    description: "Indique si le contenu est payant",
    example: true,
  })
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty({
    description: "Informations spécifiques sur les objectifs du contenu",
    example: "Perte de poids, gain de masse musculaire",
    required: false,
  })
  @IsOptional()
  @IsString()
  goalSpecifics?: string;

  @ApiProperty({ description: "ID de la catégorie du contenu", example: 1 })
  @IsNumber()
  categoryId: number;
}
