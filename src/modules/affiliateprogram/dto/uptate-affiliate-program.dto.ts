import { IsOptional, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAffiliateProgramDto {
  @ApiProperty({
    description: "Pourcentage de commission",
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  commissionRate?: number;

  @ApiProperty({
    description: "Description du programme d'affiliation",
    example: "Programme d'affiliation pour ce contenu",
    required: false,
  })
  @IsOptional()
  @IsString()
  programDescription?: string;
}
