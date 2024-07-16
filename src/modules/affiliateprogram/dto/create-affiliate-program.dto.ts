import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAffiliateProgramDto {
  @ApiProperty({
    description: "ID du contenu associé au programme d'affiliation",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @ApiProperty({ description: "Pourcentage de commission", example: 10 })
  @IsNotEmpty()
  @IsNumber()
  commissionRate: number;

  @ApiProperty({
    description: "Description du programme d'affiliation",
    example: "Programme d'affiliation pour ce contenu",
    required: false,
  })
  @IsOptional()
  @IsString()
  programDescription?: string;
}
