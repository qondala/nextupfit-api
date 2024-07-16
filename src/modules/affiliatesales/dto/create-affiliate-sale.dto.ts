import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAffiliateSaleDto {
  @ApiProperty({ description: "ID du lien d'affiliation", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  affiliateLinkId: number;

  @ApiProperty({ description: "Montant de la vente", example: 20 })
  @IsNotEmpty()
  @IsNumber()
  saleAmount: number;

  @ApiProperty({ description: "Commission gagnée sur la vente", example: 2 })
  @IsNotEmpty()
  @IsNumber()
  commissionEarned: number;
}
