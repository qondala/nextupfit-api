import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyEmailDto {
  @ApiProperty({
    description: "Token de vérification d'email",
    example: "your_verification_token",
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
