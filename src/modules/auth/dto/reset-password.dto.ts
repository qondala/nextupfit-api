import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordDto {
  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: "Password123",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Token de réinitialisation du mot de passe",
    example: "your_reset_token",
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({ description: "Nouveau mot de passe", example: "Password123" })
  @IsNotEmpty()
  @IsString()
  password: string;
}
