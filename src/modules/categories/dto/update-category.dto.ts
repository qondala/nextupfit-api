import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDto {
  @ApiProperty({
    description: "Nom de la catégorie",
    example: "Musculation",
    required: false,
  })
  @IsOptional()
  @IsString()
  categoryName?: string;

  @ApiProperty({
    description: "Description de la catégorie",
    example: "Tous les contenus liés à la musculation",
    required: false,
  })
  @IsOptional()
  @IsString()
  categoryDescription?: string;
}
