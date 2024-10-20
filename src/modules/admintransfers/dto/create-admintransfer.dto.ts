import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";

export class CreateAdminTransferDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  currency: string; // Par exemple, 'usd'

  @IsNotEmpty() // Ajoutez la méthode comme une string pour plus de flexibilité
  @IsString()
  transferMethod: "instant" | "standard"; //  'card', 'paypal', etc.

  @IsOptional()
  @ValidateIf((o) => !o.card) //  Valider uniquement si 'card' n'est pas présent
  bankAccount: any;

  @IsOptional()
  @ValidateIf((o) => !o.bankAccount) // Valider uniquement si 'bankAccount' n'est pas présent
  card: any;
}
