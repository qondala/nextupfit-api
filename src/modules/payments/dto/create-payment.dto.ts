import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({ description: "ID du contenu à payer", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  contentId: number;

  @ApiProperty({ description: "Montant du paiement", example: 20 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: "Devise du paiement", example: "usd" })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({ description: "Moyen de paiement", example: "Carte bancaire" })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
}
