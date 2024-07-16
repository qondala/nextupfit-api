import { IsNotEmpty, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordDto {
  @ApiProperty({
    description: "Email de l'utilisateur",
    example: "test@example.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
