import { IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAffiliateSaleDto {
  @ApiProperty({
    description: "Montant de la vente",
    example: 20,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  saleAmount?: number;

  @ApiProperty({
    description: "Commission gagnée sur la vente",
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  commissionEarned?: number;
}
