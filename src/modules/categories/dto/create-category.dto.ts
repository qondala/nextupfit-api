import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({ description: "Nom de la catégorie", example: "Musculation" })
  @IsNotEmpty()
  @IsString()
  categoryName: string;

  @ApiProperty({
    description: "Description de la catégorie",
    example: "Tous les contenus liés à la musculation",
    required: false,
  })
  @IsOptional()
  @IsString()
  categoryDescription?: string;
}
