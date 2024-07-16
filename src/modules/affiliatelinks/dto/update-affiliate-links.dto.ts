import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAffiliateLinkDto {
  @ApiProperty({
    description: "Lien généré pour le parrainage",
    example: "https://yourwebsite.com/affiliate/link",
    required: false,
  })
  @IsOptional()
  @IsString()
  generatedLink?: string;
}
