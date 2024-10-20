import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({ description: "ID des contenus à payer", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  contents: number[];

  @ApiProperty({ description: "Montant du paiement", example: 20 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ description: "Devise du paiement", example: "usd" })
  @IsNotEmpty()
  @IsString()
  currency: string;

  @ApiProperty({ description: "Moyen de paiement", example: "card" })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;
}
